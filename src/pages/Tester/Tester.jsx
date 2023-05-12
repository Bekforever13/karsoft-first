import React, { useState, useEffect } from 'react'
import { Pagination, Popconfirm, Spin } from 'antd'
import axiosClassic from '../../api/axios'
import { Link } from 'react-router-dom'
import './Tester.scss'

const Tester = () => {
	const [dataTable, setDataTable] = useState([])
	const [currPage, setCurrPage] = useState(1)
	const [page, setPage] = useState(1)
	const [isStatusChanged, setIsStatusChanged] = useState(0)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		axiosClassic
			.get('/api/check', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.catch(err => {
				navigate('/login', { replace: true })
			})
	}, [])

	// get total number of words for pagination
	useEffect(() => {
		axiosClassic
			.get(`/api/words_copytest`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setPage(res.data.total))
	}, [])

	// table
	useEffect(() => {
		axiosClassic
			.get(`/api/words_copytest?page=${currPage}&limit=10`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setDataTable(res.data.data))
	}, [page, isStatusChanged, currPage])

	const changeStatusOk = item => {
		fetch(`https://sozlik.abbc.uz/api/wordconfirm/${item.id}?status=1`, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
			.then(res => res.json())
			.then(data => setIsStatusChanged(item.id))
			.finally(() => setIsStatusChanged(item.id))
	}
	const changeStatusError = item => {
		fetch(`https://sozlik.abbc.uz/api/wordconfirm/${item.id}?status=0`, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
			.then(res => res.json())
			.then(data => setIsStatusChanged(item.id))
			.finally(() => setIsStatusChanged(item.id))
	}

	const logout = () => {
		axiosClassic
			.post('/api/logout', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => localStorage.removeItem('token'))
	}

	return (
		<>
			<Spin spinning={loading}>
				<header className='copywriter-header'>
					<div className='header-logo'>
						<Link to={'/copywriter'}>
							<img src='../../../public/img/logo.svg' alt='' />
						</Link>
					</div>
					<div className='nav'>
						<Link className='logout' onClick={() => logout} to={'/login'}>
							<i className='bx bx-log-out'></i>
							Logout
						</Link>
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
												<Popconfirm
													title='Taza soz unadima?'
													onConfirm={() => changeStatusOk(item)}
													okButtonProps={{
														style: { backgroundColor: '#6d6df8' },
													}}
												>
													<button className='likeBtn'>
														<i className='bx bxs-like'></i>
													</button>
												</Popconfirm>
												<Popconfirm
													title='Qayta korip shigiw kerekpa?'
													onConfirm={() => changeStatusError(item)}
													okButtonProps={{
														style: { backgroundColor: '#fc7a7a' },
													}}
												>
													<button className='dislikeBtn'>
														<i className='bx bxs-dislike'></i>
													</button>
												</Popconfirm>
											</div>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<Pagination
						showSizeChanger={false}
						onChange={e => setCurrPage(e)}
						total={page}
					/>
				</div>
			</Spin>
		</>
	)
}

export default Tester
