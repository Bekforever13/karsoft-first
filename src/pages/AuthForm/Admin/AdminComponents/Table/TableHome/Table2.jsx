import React, { useState, useEffect } from 'react'
import { axiosClassic } from '../../../../../../api/axios'
import moment from 'moment'
import { Pagination } from 'antd'

const Table2 = () => {
	const [dataTable, setDataTable] = useState([])

	useEffect(() => {
		axiosClassic
			.get('/api/categoriesdate?page=1', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
			})
	}, [])

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
								<th className='tbody__tr__th'>{data.latin}</th>
								<th className='tbody__tr__th'>{data.kiril}</th>
								<th className='tbody__tr__th'>
									{moment(data.created_at).format('MM-D-YYYY, h:mm:ss')}
								</th>
								<th className='tbody__tr__th'>
									<div className='table__actions'>
										<button>Delete</button>
										<button>Edit</button>
									</div>
								</th>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination total={324} />
		</>
	)
}

export default Table2
