import React, { useState, useEffect, useContext } from 'react'
import './TableSozler.scss'
import { Context } from '../../../../../App'
import { axiosClassic } from '../../../../../api/axios'
import moment from 'moment'
import { Pagination, Modal, Select, Spin, Button } from 'antd'

const Table = () => {
	const [kirilToLatinWord, setKirilToLatinWord] = useState({
		kiril: '',
	})
	const [convertedWord, setConvertedWord] = useState({
		latin: '',
	})
	const [description, setDescription] = useState({
		kiril: '',
	})
	const [convertedDescription, setConvertedDescription] = useState({
		latin: '',
	})
	const [
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
		allCategory,
		totalWords,
		setTotalWords,
	] = useContext(Context)
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [renderTable, setRenderTable] = useState(0)
	const [hammeCategory, setHammeCategory] = useState([])
	const [sinonimOptions, setSinonimOptions] = useState([])
	const [antonimOptions, setAntonimOptions] = useState([])
	const [isModalEditOpen, setIsModalEditOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [dataForEdit, setDataForEdit] = useState({
		id: null,
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories_id: null,
		sinonims: [],
		antonims: [],
		status: '',
	})
	const showModalEdit = data => {
		setDataForEdit({
			id: data.id,
			latin: data.latin,
			kiril: data.kiril,
			description_latin: data.description_latin,
			description_kiril: data.description_kiril,
			categories_id: data.categories_id,
			sinonims: data.sinonims,
			antonims: data.antonims,
			status: data.status,
		})
		setIsModalEditOpen(true)
	}

	const handleOk = () => {
		setLoading(true)
		setIsModalEditOpen(false)
		axiosClassic
			.post(`/api/words/${dataForEdit.id}`, dataForEdit, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(() => {
				setRenderTable(renderTable + 1)
				setDataForEdit({
					latin: '',
					kiril: '',
					description_latin: '',
					description_kiril: '',
					categories_id: 0,
					sinonims: [],
					antonims: [],
				})
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const kirilToLatin = () => {
		axiosClassic
			.post('/api/kiriltolatin', kirilToLatinWord, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setConvertedWord({
					kiril: res.data.kiril,
					latin: res.data.latin,
				})
				setDataForEdit({ ...dataForEdit, latin: res.data.latin })
			})
	}
	const convertDescription = () => {
		axiosClassic
			.post('/api/kiriltolatin', description, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setConvertedDescription({ latin: res.data.latin })
				setDataForEdit({ ...dataForEdit, description_latin: res.data.latin })
			})
	}

	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get(`/api/categories`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setHammeCategory(res.data.data)
			})
	}, [])

	const handleCancel = () => {
		setDataForEdit({
			latin: '',
			kiril: '',
			description_latin: '',
			description_kiril: '',
			categories_id: undefined,
			sinonims: [],
			antonims: [],
		})
		setIsModalEditOpen(false)
	}

	const deleteItem = id => {
		axiosClassic
			.delete(`/api/words/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(() => {
				setRenderTable(renderTable - 1)
				setTotalWords(totalWords - 1)
			})
	}

	// table
	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get(`/api/words?page=${currentPage}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
			})
			.finally(() => setLoading(false))
	}, [currentPage, renderTable, totalWords])

	useEffect(() => {
		axiosClassic.get(`/api/words?limit=500&`).then(res => {
			return res.data.data.map(item => {
				setAntonimOptions(el => {
					return [...el, { label: item.latin, value: item.id }]
				})
				setSinonimOptions(el => {
					return [...el, { label: item.latin, value: item.id }]
				})
			})
		})
	}, [])

	const handleAntonimChange = value => {
		console.log(value)
	}
	const handleSinonimChange = value => {
		console.log(value)
	}

	const categoryOptions = [
		allCategory.map(category => ({
			label: category.latin,
			value: category.latin,
		})),
	]

	return (
		<>
			<Spin spinning={loading}>
				<table className='tableSozler'>
					<thead className='thead'>
						<tr className='thead__tr'>
							<th className='thead__tr__th'>Sóz</th>
							<th className='thead__tr__th'>Сөз</th>
							<th className='thead__tr__th'>Kategoriya</th>
							<th className='thead__tr__th'>Kún</th>
							<th className='thead__tr__th'>Actions</th>
						</tr>
					</thead>
					<tbody className='tbody'>
						{dataTable.map(data => {
							return (
								<tr className='tbody__tr' key={data.id}>
									<th className='tbody__tr__th'>{data.latin}</th>
									<th className='tbody__tr__th'>{data.kiril}</th>

									<th className='tbody__tr__th'>
										{data.categories.map(i => i.latin)}
									</th>
									<th className='tbody__tr__th'>
										{moment(data.created_at).format('MM-D-YYYY, h:mm:ss')}
									</th>
									<th className='tbody__tr__th'>
										<div className='table__actions'>
											<button
												onClick={() => showModalEdit(data)}
												className='editBtn'
											>
												<i className='bx bx-pencil'></i>
											</button>

											<button
												className='deleteBtn'
												onClick={() => deleteItem(data.id)}
											>
												<i className='bx bx-trash'></i>
											</button>
										</div>
									</th>
								</tr>
							)
						})}
					</tbody>
				</table>
				<Pagination
					showSizeChanger={false}
					onChange={e => setCurrentPage(e)}
					total={totalWords}
				/>
				<Modal
					className='modalEdit'
					mask={false}
					title='Edit Word'
					width={'850px'}
					open={isModalEditOpen}
					onCancel={handleCancel}
					footer={[
						<div key={'btns'} className='btns'>
							<div className='left-btns'>
								<Button
									key={'kirilToLatin'}
									className='convert-btn'
									onClick={kirilToLatin}
								>
									Convert Word
								</Button>
								<Button
									key={'convertDescription'}
									className='convert-btn'
									onClick={convertDescription}
								>
									Convert Description
								</Button>
							</div>
							<div className='right-btns'>
								<Button
									key={'cancel'}
									className='cancel-btn'
									onClick={handleCancel}
								>
									Cancel
								</Button>

								<Button
									key={'ok'}
									type='primary'
									className='ok-btn'
									onClick={handleOk}
								>
									Ok
								</Button>
							</div>
						</div>,
					]}
					okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
				>
					<div className='modalEdit-wrapper'>
						<label>
							<h2>Kiril:</h2>
							<input
								className='input'
								value={dataForEdit?.kiril || kirilToLatinWord.kiril}
								onChange={e => {
									setKirilToLatinWord({
										kiril: e.target.value,
									})
									setDataForEdit({ ...dataForEdit, kiril: e.target.value })
								}}
								type='text'
							/>
						</label>
						<label>
							<h2>Latin:</h2>
							<input
								className='input'
								value={dataForEdit?.latin || convertedWord?.latin}
								onChange={e =>
									setDataForEdit({ ...dataForEdit, latin: e.target.value })
								}
								type='text'
							/>
						</label>

						<label>
							<h2>Description_kiril:</h2>
							<textarea
								className='textarea'
								value={dataForEdit?.description_kiril || description.kiril}
								onChange={e => {
									setDescription({ kiril: e.target.value })
									setDataForEdit({
										...dataForEdit,
										description_kiril: e.target.value,
									})
								}}
							/>
						</label>
						<label>
							<h2>Description_latin:</h2>
							<textarea
								className='textarea'
								value={
									dataForEdit?.description_latin || convertedDescription?.latin
								}
								onChange={e =>
									setDataForEdit({
										...dataForEdit,
										description_latin: e.target.value,
									})
								}
							/>
						</label>
						<label>
							<h2>Status</h2>
							<Select
								className='select'
								title='Status'
								value={dataForEdit?.status}
								onChange={e => setDataForEdit({ ...dataForEdit, status: e })}
								options={[
									{ label: 'Approved', value: 'approved' },
									{ label: 'Waiting', value: 'waiting' },
									{ label: 'Canceled', value: 'canceled' },
								]}
							></Select>
						</label>

						<label>
							<h2>Category:</h2>
							<Select
								className={'select'}
								defaultValue={dataForEdit.categories?.map(item => item.latin)}
								onChange={e => {
									hammeCategory.map(item =>
										item.latin === e
											? setDataForEdit({
													...dataForEdit,
													categories_id: item.id,
											  })
											: ''
									)
								}}
								options={categoryOptions[0]}
							/>
						</label>
						<label>
							<h2>Antonim</h2>
							<Select
								mode='multiple'
								allowClear
								style={{
									width: '100%',
								}}
								placeholder='Please select'
								onChange={handleAntonimChange}
								options={antonimOptions}
							/>
						</label>
						<label>
							<h2>Sinonim</h2>
							<Select
								mode='multiple'
								allowClear
								style={{
									width: '100%',
								}}
								placeholder='Please select'
								onChange={handleSinonimChange}
								options={sinonimOptions}
							/>
						</label>
					</div>
				</Modal>
			</Spin>
		</>
	)
}

export default Table
