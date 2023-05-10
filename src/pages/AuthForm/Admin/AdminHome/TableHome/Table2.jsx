import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import axiosClassic from '../../../../../api/axios'
import { Pagination, Modal, Select } from 'antd'
import { Context } from '../../../../../App'

const Table2 = () => {
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isModalEditOpen, setIsModalEditOpen] = useState(false)
	const [renderTable, setRenderTable] = useState({})
	const [
		allCategory,
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
	] = useContext(Context)
	const handleOk = () => {
		setIsModalEditOpen(false)
	}
	const handleCancel = () => {
		setIsModalEditOpen(false)
	}
	const [dataForEdit, setDataForEdit] = useState({
		latin: '',
		kiril: '',
	})

	// delete item from table
	const deleteItem = id => {
		axiosClassic
			.delete(`/api/categories/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setRenderTable(res.data))
	}
	// edit item from table
	const showModalEdit = data => {
		console.log(data)
		setIsModalEditOpen(true)
	}

	//render table
	useEffect(() => {
		axiosClassic
			.get(`/api/categoriesdate?page=${currentPage}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
			})
	}, [currentPage, renderTable])

	return (
		<>
			<table className='table'>
				<thead className='thead'>
					<tr className='thead__tr'>
						<th className='thead__tr__th'>Latin</th>
						<th className='thead__tr__th'>Kiril</th>
						<th className='thead__tr__th'>Kún</th>
						<th className='thead__tr__th'>Actions</th>
					</tr>
				</thead>
				<tbody className='tbody'>
					{dataTable.map(data => {
						return (
							<tr className='tbody__tr' key={data.id}>
								<td className='tbody__tr__th'>{data.latin}</td>
								<td className='tbody__tr__th'>{data.kiril}</td>
								<td className='tbody__tr__th'>
									{moment(data.created_at).format('MM-D-YYYY, h:mm:ss')}
								</td>
								<td className='tbody__tr__th'>
									<div className='table__actions'>
										<button
											className='editBtn'
											onClick={() => showModalEdit(data)}
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
				total={allCategory.length}
				defaultPageSize={10}
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
				</div>
			</Modal>
		</>
	)
}

export default Table2
