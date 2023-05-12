import React, { useState, useEffect } from 'react'
import { Modal, Pagination, Popconfirm, Spin } from 'antd'
import axiosClassic from '../../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import './Tester.scss'
import moment from 'moment'

const Tester = () => {
	const [dataTable, setDataTable] = useState([])
	const [currPage, setCurrPage] = useState(1)
	const [page, setPage] = useState(1)
	const [isStatusChanged, setIsStatusChanged] = useState(0)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const showModal = item => {
		setIsModalOpen(true)
		setShowItem(item)
		console.log(item)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	// check
	useEffect(() => {
		axiosClassic
			.get('/api/check', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setCurrentUser(res.data.data.user)
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

	const logout = e => {
		e.preventDefault()
		localStorage.removeItem('token')
		navigate('/login', { replace: true })
	}

	const [showItem, setShowItem] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories: [],
		synonyms: [],
		antonyms: [],
	})

	const [currentUser, setCurrentUser] = useState([])

	return (
		<>
			<Spin spinning={loading}>
				<header className='copywriter-header'>
					<div className='header-logo'>
						<Link to={'/tester'}>
							<img src='../../../public/img/logo.svg' alt='' />
						</Link>
					</div>
					<div className='user'>
						<h1 className='text-xl'>{currentUser.name}</h1>
					</div>
					<div className='nav'>
						<Link className='logout' onClick={e => logout(e)} to={'/login'}>
							<i className='bx bx-log-out'></i>
							Logout
						</Link>
					</div>
				</header>
				<div className='table-wrapper'>
					<table className='copywriterTable'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Created at</th>
								<th>Latin</th>
								<th>Kiril</th>
								<th>Category</th>
								<th>Status</th>
								<th>View</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{dataTable?.map(item => {
								return (
									<tr key={item.id} className='text-base'>
										<td>{item.id}</td>
										<td>
											{moment(item.created_at).format('MM-D-YYYY, h:mm:ss')}
										</td>
										<td>{item.latin}</td>
										<td>{item.kiril}</td>
										<td>{item.categories[0].latin}</td>
										<td>{item.status}</td>
										<td>
											<button onClick={() => showModal(item)}>
												<i className='bx bxs-show text-xl'></i>
											</button>
										</td>
										<td className='actions'>
											<div className='btns-wrapper'>
												<Popconfirm
													title='Like basamizba?'
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
				<Modal
					className={'showItemModal'}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					width={'850px'}
					height={'650px'}
					okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
					title={showItem.latin}
				>
					<div className='modal-wrapper'>
						<div className='modal-item'>
							<span className='info'>Latin:</span>{' '}
							<span className='val'>{showItem.latin}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Kiril:</span>{' '}
							<span className='val'>{showItem.kiril}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Description_latin:</span>{' '}
							<span className='val'>{showItem.description_latin}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Description_kiril:</span>{' '}
							<span className='val'>{showItem.description_kiril}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Category:</span>{' '}
							<span className='val'>{showItem.categories[0]?.latin}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Status:</span>{' '}
							<span className='val'>{showItem.status}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Antonim:</span>{' '}
							<span className='val'>{showItem.antonyms}</span>
						</div>
						<div className='modal-item'>
							<span className='info'>Sinonim:</span>{' '}
							<span className='val'>{showItem.synonyms}</span>
						</div>
					</div>
				</Modal>
			</Spin>
		</>
	)
}

export default Tester
