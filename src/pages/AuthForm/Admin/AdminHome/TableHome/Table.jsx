import React, { useState, useEffect, useContext } from 'react'
import './Table.scss'
import moment from 'moment'
import axiosClassic from '../../../../../api/axios'
import { Pagination } from 'antd'
import { Modal, Select } from 'antd'
import { Context } from '../../../../../App'

const Table = ({ renderTable, setRenderTable }) => {
	const [
		allCategory,
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
	] = useContext(Context)
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isModalEditOpen, setIsModalEditOpen] = useState(false)
	const [dataForEdit, setDataForEdit] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories_id: null,
		// sinonims: []
		// antonims: []
		// audio: undefined,
	})

	const showModalEdit = data => {
		console.log(data)
		setIsModalEditOpen(true)
	}
	const handleOk = () => {
		setIsModalEditOpen(false)
	}
	const handleCancel = () => {
		setIsModalEditOpen(false)
	}

	// delete item from table
	const deleteItem = id => {
		axiosClassic
			.delete(`/api/words/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setRenderTable(res.data))
	}

	// useEffect for table and pagination
	useEffect(() => {
		axiosClassic
			.get(`/api/wordsdate?page=${currentPage}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
			})
	}, [currentPage, renderTable])

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

	return (
		<>
			<table className='table'>
				<thead className='thead'>
					<tr className='thead__tr'>
						<th className='thead__tr__th'>Sóz</th>
						<th className='thead__tr__th'>Kategoriya</th>
						<th className='thead__tr__th'>Kún</th>
						<th className='thead__tr__th'>Actions</th>
					</tr>
				</thead>
				<tbody className='tbody'>
					{dataTable.map(data => {
						return (
							<tr className='tbody__tr' key={data.id}>
								<td className='tbody__tr__th'>{data.latin}</td>
								<td className='tbody__tr__th'>{data.category_latin}</td>
								<td className='tbody__tr__th'>
									{moment(data.created_at).format('MM-D-YYYY, h:mm:ss')}
								</td>
								<td className='tbody__tr__th'>
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
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination
				onChange={e => setCurrentPage(e)}
				total={allWordsArray.length}
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
						<input className='input' value={dataForEdit.latin} type='text' />
					</label>
					<label>
						<h2>Kiril:</h2>
						<input className='input' value={dataForEdit.kiril} type='text' />
					</label>
					<label>
						<h2>Description_latin:</h2>
						<input
							className='input'
							value={dataForEdit.description_latin}
							type='text'
						/>
					</label>
					<label>
						<h2>Description_kiril:</h2>
						<input
							className='input'
							value={dataForEdit.description_latin}
							type='text'
						/>
					</label>
					<label>
						<h2>Audio: </h2>
						<input className='audio' value={dataForEdit.audio} type='file' />
					</label>
					<label>
						<h2>Category:</h2>
						<Select
							className={'select'}
							defaultValue={'select'}
							onChange={e => {
								allCategory.map(item =>
									item.latin === e
										? setNewWord({ ...newWord, categories_id: item.id })
										: ''
								)
							}}
						>
							{allCategory.map(category => {
								return (
									<Select.Option key={category.id} value={category.latin}>
										{category.latin}
									</Select.Option>
								)
							})}
						</Select>
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
		</>
	)
}

export default Table
