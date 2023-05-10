import { Pagination, Modal, Select, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Copywriter.scss'
import axiosClassic from '../../api/axios'
import { Context } from '../../App'

const Copywriter = () => {
	const [
		allWordsArray,
		allCategory,
		page,
		setPage,
		lang,
		setLang,
		totalWords,
		totalCategory,
	] = useContext(Context)
	const [newWord, setNewWord] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories_id: null,
		// sinonims: [],
		// antonims: [],
		// audio: undefined,
	})

	const [hammeCategory, setHammeCategory] = useState([])
	useEffect(() => {
		axiosClassic
			.get(`/api/categories`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setHammeCategory(res.data.data)
			})
	}, [])

	const [wordsCount, setWordsCount] = useState(0)
	useEffect(() => {
		axiosClassic
			.get('/api/wordsdate?limit=1000', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setWordsCount(res.data.total))
	}, [wordsCount])

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
		console.log(newWord)
		axiosClassic
			.post('/api/words', newWord, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(res => console.log(res))
			.catch(err => console.log(err))
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

	const deleteItem = id => {
		axiosClassic
			.delete(`/api/words/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setRenderTable(res.data))
	}

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
											<button className='editBtn'>
												<i className='bx bx-pencil'></i>
											</button>
											<button
												className='deleteBtn'
												onClick={() => deleteItem(item.id)}
											>
												<i className='bx bx-trash'></i>
											</button>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<Pagination
					defaultPageSize={10}
					onChange={e => setCurrPage(e)}
					total={wordsCount}
				/>
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
							<input
								className='input'
								value={newWord.latin}
								onChange={e =>
									setNewWord({ ...newWord, latin: e.target.value })
								}
								type='text'
							/>
						</label>
						<label>
							<h2>Kiril:</h2>
							<input
								className='input'
								value={newWord.kiril}
								onChange={e =>
									setNewWord({ ...newWord, kiril: e.target.value })
								}
								type='text'
							/>
						</label>
						<label>
							<h2>Description_latin:</h2>
							<textarea
								className='textarea'
								value={newWord.description_latin}
								onChange={e =>
									setNewWord({ ...newWord, description_latin: e.target.value })
								}
							/>
						</label>
						<label>
							<h2>Description_kiril:</h2>
							<textarea
								className='textarea'
								value={newWord.description_kiril}
								onChange={e =>
									setNewWord({ ...newWord, description_kiril: e.target.value })
								}
							/>
						</label>
						<label>
							<h2>Audio: </h2>
							<input
								className='audio'
								onChange={e =>
									setNewWord({ ...newWord, audio: e.target.files })
								}
								type='file'
							/>
						</label>
						<label>
							<h2>Category:</h2>
							<Select
								className='select'
								defaultValue={'select'}
								onChange={e => {
									hammeCategory.map(item =>
										item.latin === e
											? setNewWord({ ...newWord, categories_id: item.id })
											: ''
									)
								}}
							>
								{hammeCategory.map(category => {
									return (
										<Select.Option key={category.id} value={category.latin}>
											{category.latin}
										</Select.Option>
									)
								})}
							</Select>
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
