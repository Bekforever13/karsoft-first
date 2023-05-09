import { Pagination, Modal, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Copywriter.scss'
import axiosClassic from '../../api/axios'

const Copywriter = () => {
	const [allCategory, setAllCategory] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const [sinonimOptions, setSinonimOptions] = useState([])
	const [antonimOptions, setAntonimOptions] = useState([])

	useEffect(() => {
		axiosClassic.get(`/api/words?limit=500&`).then(res => {
			return res.data.data.map(item => {
				setAntonimOptions(el => {
					return [...el, { label: item.latin, value: item.id }]
				})
				setSinonimOptions(el => {
					return [...el, { label: item.latin, value: item.id }]
				})
			})
		})
	}, [])

	const handleAntonimChange = value => {
		console.log(value)
	}
	const handleSinonimChange = value => {
		console.log(value)
	}

	// all category
	useEffect(() => {
		axiosClassic
			.get('/api/categories', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setAllCategory(res.data.data)
			})
			.catch(err => console.log(err))
	}, [])

	// useeffect for get all word
	// useEffect(() => {
	// 	axiosClassic
	// 		.get('', {
	// 			headers: {
	// 				Authorization: 'Bearer ' + localStorage.getItem('token'),
	// 			},
	// 		})
	// 		.then(res => console.log(res))
	// }, [])

	// useeffect for get all pages
	// useEffect(() => {
	// 	axiosClassic
	// 		.get('', {
	// 			headers: {
	// 				Authorization: 'Bearer ' + localStorage.getItem('token'),
	// 			},
	// 		})
	// 		.then(res => console.log(res))
	// }, [])

	return (
		<>
			<header className='copywriter-header'>
				<div className='header-logo'>
					<Link to={'/copywriter'}>
						<img src='../../../public/img/logo.svg' alt='' />
					</Link>
				</div>
				<div className='add-word'>
					<button onClick={showModal}>Add word</button>
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
						<tr>
							<td>lorem</td>
							<td>лорем</td>
							<td>Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet</td>
							<td>Лорем ипсум долор сит амет.</td>
							<td>Atliq</td>
							<td>на проверке</td>
							<td className='actions'>
								<div className='btns-wrapper'>
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
							</td>
						</tr>
					</tbody>
				</table>
				<Pagination />
				<Modal
					className='copywriterModal'
					title='Add new word'
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
				>
					<div className='newWordForm'>
						<label>
							<h2>Latin:</h2>
							<input className='input' type='text' />
						</label>
						<label>
							<h2>Kiril:</h2>
							<input className='input' type='text' />
						</label>
						<label>
							<h2>Description_latin:</h2>
							<textarea className='textarea' />
						</label>
						<label>
							<h2>Description_kiril:</h2>
							<textarea className='textarea' />
						</label>
						<label>
							<h2>Audio: </h2>
							<input className='audio' type='file' />
						</label>
						<label>
							<h2>Category:</h2>
							<select name='category'>
								<optgroup label='category'>
									{allCategory.map(category => {
										return (
											<option key={category.id} value={category.latin}>
												{category.latin}
											</option>
										)
									})}
								</optgroup>
							</select>
						</label>
						<label>
							<h2>Antonim</h2>
							<Select
								mode='multiple'
								allowClear
								style={{
									width: '100%',
								}}
								placeholder='Please select'
								onChange={handleAntonimChange}
								options={antonimOptions}
							/>
						</label>
						<label>
							<h2>Sinonim</h2>
							<Select
								mode='multiple'
								allowClear
								style={{
									width: '100%',
								}}
								placeholder='Please select'
								onChange={handleSinonimChange}
								options={sinonimOptions}
							/>
						</label>
					</div>
				</Modal>
			</div>
		</>
	)
}

export default Copywriter
