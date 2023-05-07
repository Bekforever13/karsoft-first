import React, { useState, useEffect } from 'react'
import './TableSozler.scss'
import { axiosClassic } from '../../../../../api/axios'
import moment from 'moment'
import { Pagination } from 'antd'

const Table = () => {
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		axiosClassic
			.get(`/api/words?page=${currentPage}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
				console.log(res.data.data)
			})
	}, [currentPage])

	return (
		<>
			<table className='tableSozler'>
				<thead className='thead'>
					<tr className='thead__tr'>
						<th className='thead__tr__th'>Sóz</th>
						<th className='thead__tr__th'>Сөз</th>
						<th className='thead__tr__th'>Audio</th>
						<th className='thead__tr__th'>Desc__kiril</th>
						<th className='thead__tr__th'>Desc_Latin</th>
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
								<th className='tbody__tr__th'>{data.description_kiril}</th>
								<th className='tbody__tr__th'>{data.description_latin}</th>
								<th className='tbody__tr__th'>
									{data.categories.map(i => i.latin)}
								</th>
								<th className='tbody__tr__th'>
									{moment(data.created_at).format('MM-D-YYYY, h:mm:ss')}
								</th>
								<th className='tbody__tr__th'>
									<div className='table__actions'>
										<button className='editBtn'>
											<i className='bx bx-pencil'></i>
										</button>
										<button className='deleteBtn'>
											<i className='bx bx-trash'></i>
										</button>
									</div>
								</th>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination onChange={e => setCurrentPage(e)} total={324} />
		</>
	)
}

export default Table