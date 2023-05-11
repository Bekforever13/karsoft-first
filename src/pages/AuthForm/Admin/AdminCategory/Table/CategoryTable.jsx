import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import axiosClassic from '../../../../../api/axios'
import { Pagination, Spin, Modal } from 'antd'
import './CategoryTable.scss'
import { Context } from '../../../../../App'

const CategoryTable = ({ render, setRender }) => {
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
	const [loading, setLoading] = useState(false)
	const [isModalEditOpen, setIsModalEditOpen] = useState(false)
	const [dataForEdit, setDataForEdit] = useState({
		latin: '',
		kiril: '',
	})
	const [newData, setNewData] = useState({
		id: null,
		latin: '',
		kiril: '',
	})

	const handleOk = data => {
		fetch(`https://sozlik.abbc.uz/api/categories/${data.id}`, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(res => res.json())
			.then(data => setRender(data))
		setIsModalEditOpen(false)
	}
	const handleCancel = () => {
		setIsModalEditOpen(false)
	}
	// edit item from table
	const showModalEdit = data => {
		console.log(data)
		setNewData({ ...newData, id: data.id })
		setDataForEdit({
			latin: data.latin,
			kiril: data.kiril,
		})
		setIsModalEditOpen(true)
	}

	const deleteItem = id => {
		axiosClassic
			.delete(`/api/categories/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setRender(render + 1))
	}

	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get(`/api/categoriesdate?page=${currentPage}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
			})
			.finally(() => setLoading(false))
	}, [currentPage, render])

	return (
		<>
			<Spin spinning={loading}>
				<table className='category-table'>
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
									<th className='tbody__tr__th'>{data.latin}</th>
									<th className='tbody__tr__th'>{data.kiril}</th>
									<th className='tbody__tr__th'>
										{moment(data.created_at).format('MM-D-YYYY, h:mm:ss')}
									</th>
									<th className='tbody__tr__th'>
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
									</th>
								</tr>
							)
						})}
					</tbody>
				</table>
				<Pagination
					onChange={e => setCurrentPage(e)}
					total={totalCategory}
					defaultPageSize={10}
				/>
				<Modal
					className='modalEdit'
					mask={false}
					title='Edit Word'
					open={isModalEditOpen}
					onOk={() => handleOk(newData)}
					onCancel={handleCancel}
					okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
				>
					<div className='modalEdit-wrapper'>
						<label>
							<h2>Latin:</h2>
							<input
								className='input'
								onChange={e => {
									setDataForEdit({ ...dataForEdit, latin: e.target.value })
									setNewData({ ...newData, latin: e.target.value })
								}}
								value={dataForEdit.latin}
								type='text'
							/>
						</label>
						<label>
							<h2>Kiril:</h2>
							<input
								className='input'
								onChange={e => {
									setDataForEdit({ ...dataForEdit, kiril: e.target.value })
									setNewData({ ...newData, kiril: e.target.value })
								}}
								value={dataForEdit.kiril}
								type='text'
							/>
						</label>
					</div>
				</Modal>
			</Spin>
		</>
	)
}

export default CategoryTable
