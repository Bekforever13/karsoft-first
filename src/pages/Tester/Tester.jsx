import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import axiosClassic from '../../api/axios'
import { Link } from 'react-router-dom'
import './Tester.scss'

const Tester = () => {
	const [dataTable, setDataTable] = useState([])
	const [currPage, setCurrPage] = useState(1)

	useEffect(() => {
		axiosClassic
			.get(`/api/words_copytest?page=${currPage}&limit=10`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setDataTable(res.data.data))
	}, [dataTable])

	const changeStatus = item => {
		axiosClassic
			.put(`/api/wordconfirm/${item.id}?status=${item.status}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => console.log(res))
	}

	return (
		<>
			<header className='copywriter-header'>
				<div className='header-logo'>
					<Link to={'/copywriter'}>
						<img src='../../../public/img/logo.svg' alt='' />
					</Link>
				</div>
				<div className='nav'>
					<Link to={'/admin'}>Admin</Link>
					<Link to={'/copywriter'}>Copywriter</Link>
					<Link to={'/tester'}>Tester</Link>
				</div>
			</header>
			<div className='table-wrapper'>
				<table className='copywriterTable'>
					<thead>
						<tr>
							<th>Latin</th>
							<th>Kiril</th>
							<th>Description latin</th>
							<th>Description kiril</th>
							<th>Category</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{dataTable.map(item => {
							return (
								<tr key={item.id}>
									<td>{item.latin}</td>
									<td>{item.kiril}</td>
									<td>{item.description_latin}</td>
									<td>{item.description_kiril}</td>
									<td>{item.categories[0].latin}</td>
									<td>{item.status}</td>
									<td className='actions'>
										<div className='btns-wrapper'>
											<button className='likeBtn' onClick={() => changeStatus}>
												<i className='bx bxs-like'></i>
											</button>
											<button className='dislikeBtn'>
												<i className='bx bxs-dislike'></i>
											</button>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<Pagination />
			</div>
		</>
	)
}

export default Tester
