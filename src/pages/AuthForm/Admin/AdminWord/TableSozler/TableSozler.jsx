import React, { useState, useEffect, useContext } from 'react'
import './TableSozler.scss'
import { Context } from '../../../../../App'
import { axiosClassic } from '../../../../../api/axios'
import moment from 'moment'
import { Pagination, Modal, Select, Spin } from 'antd'

const Table = () => {
	const [
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
		allCategory,
		totalWords,
	] = useContext(Context)
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isModalEditOpen, setIsModalEditOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [dataForEdit, setDataForEdit] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories_id: null,
		sinonims: [],
		antonims: [],
		status: '',
		// audio: undefined,
	})
	const showModalEdit = data => {
		console.log(data)
		setDataForEdit({
			latin: data.latin,
			kiril: data.kiril,
			description_latin: data.description_latin,
			description_kiril: data.description_kiril,
			categories_id: data.categories_id,
			sinonims: data.sinonims,
			antonims: data.antonims,
			status: data.status,
			// audio: undefined,
		})
		setIsModalEditOpen(true)
	}
	const handleOk = () => {
		setIsModalEditOpen(false)
	}
	const handleCancel = () => {
		setDataForEdit({
			latin: '',
			kiril: '',
			description_latin: '',
			description_kiril: '',
			categories_id: undefined,
			sinonims: [],
			antonims: [],
			// audio: undefined,
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
			.then(res => console.log(res.data))
	}

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
	}, [currentPage])

	const [sinonimOptions, setSinonimOptions] = useState([])
	const [antonimOptions, setAntonimOptions] = useState([])

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
							<th className='thead__tr__th'>Audio</th>
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
										<i className='bx bxs-volume-full cursor-pointer'></i>
									</th>
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
					open={isModalEditOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
				>
					<div className='modalEdit-wrapper'>
						<label>
							<h2>Latin:</h2>
							<input
								className='input'
								onChange={e =>
									setDataForEdit({ ...dataForEdit, latin: e.target.value })
								}
								value={dataForEdit.latin}
								type='text'
							/>
						</label>
						<label>
							<h2>Kiril:</h2>
							<input
								className='input'
								onChange={e =>
									setDataForEdit({ ...dataForEdit, kiril: e.target.value })
								}
								value={dataForEdit.kiril}
								type='text'
							/>
						</label>
						<label>
							<h2>Description_latin:</h2>
							<textarea
								className='textarea'
								onChange={e =>
									setDataForEdit({
										...dataForEdit,
										description_latin: e.target.value,
									})
								}
								value={dataForEdit.description_latin}
								type='text'
							/>
						</label>
						<label>
							<h2>Description_kiril:</h2>
							<textarea
								className='textarea'
								onChange={e =>
									setDataForEdit({
										...dataForEdit,
										description_kiril: e.target.value,
									})
								}
								value={dataForEdit.description_latin}
								type='text'
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
							<h2>Audio: </h2>
							<input
								className='audio'
								onChange={e =>
									setDataForEdit({ ...dataForEdit, audio: e.target.files })
								}
								value={dataForEdit.audio}
								type='file'
							/>
						</label>
						<label>
							<h2>Category:</h2>
							<Select
								className={'select'}
								value={dataForEdit?.categories_id}
								onChange={e => {
									setDataForEdit({
										...dataForEdit,
										categories_id: e,
									})
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
