import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import axiosClassic from '../../../../../api/axios'
import { Pagination, Spin } from 'antd'
import { Context } from '../../../../../App'

const Table2 = () => {
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [loading, setLoading] = useState(false)

	const [
		allCategory,
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
	] = useContext(Context)

	//render table
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
	}, [currentPage])

	return (
		<>
			<Spin spinning={loading}>
				<table className='table'>
					<thead className='thead'>
						<tr className='thead__tr'>
							<th className='thead__tr__th'>Latin</th>
							<th className='thead__tr__th'>Kiril</th>
							<th className='thead__tr__th'>Kún</th>
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
								</tr>
							)
						})}
					</tbody>
				</table>
				<Pagination
					onChange={e => setCurrentPage(e)}
					total={totalCategory.length}
					defaultPageSize={10}
				/>
			</Spin>
		</>
	)
}

export default Table2
