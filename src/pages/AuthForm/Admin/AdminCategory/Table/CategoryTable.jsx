import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axiosClassic from '../../../../../api/axios'
import { Pagination } from 'antd'
import './CategoryTable.scss'

const CategoryTable = () => {
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)

	const deleteItem = id => {
		axiosClassic
			.delete(`/api/categories/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => console.log(res.data))
	}

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
	}, [currentPage])

	return (
		<>
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
										<button className='editBtn'>
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
				total={16}
				defaultPageSize={10}
			/>
		</>
	)
}

export default CategoryTable
