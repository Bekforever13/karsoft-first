import React, { useState, useEffect, useContext } from 'react'
import './Table.scss'
import moment from 'moment'
import axiosClassic from '../../../../../api/axios'
import { Pagination, Spin } from 'antd'
import { Context } from '../../../../../App'

const Table = () => {
	const [
		allCategory,
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
		totalWords,
	] = useContext(Context)
	const [loading, setLoading] = useState(false)
	const [dataTable, setDataTable] = useState([])
	const [currentPage, setCurrentPage] = useState(1)

	//  pagination
	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get(`/api/wordsdate?page=${currentPage}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataTable(res.data.data.map(e => e))
			})
			.finally(() => setLoading(false))
	}, [currentPage, totalWords])

	return (
		<>
			<Spin spinning={loading}>
				<table className='table'>
					<thead className='thead'>
						<tr className='thead__tr'>
							<th className='thead__tr__th'>Sóz</th>
							<th className='thead__tr__th'>Kategoriya</th>
							<th className='thead__tr__th'>Kún</th>
							<th className='thead__tr__th'>Status</th>
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
										<div className='table__status'>{data.status}</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<Pagination
					defaultPageSize={10}
					onChange={e => setCurrentPage(e)}
					total={totalWords}
					showSizeChanger={false}
				/>
			</Spin>
		</>
	)
}

export default Table
