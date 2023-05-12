import { Pagination, Modal, Select, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Copywriter.scss'
import axiosClassic from '../../api/axios'
import { Context } from '../../App'

const Copywriter = () => {
	const [loading, setLoading] = useState(false)
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

	// view modal start
	const [isViewModalOpen, setIsViewModalOpen] = useState(false)
	const [showItem, setShowItem] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories: [],
		synonyms: [],
		antonyms: [],
		// audio: undefined,
	})
	const showViewModal = item => {
		setIsViewModalOpen(true)
		setShowItem(item)
		console.log(item)
	}
	const handleOkView = () => {
		setIsViewModalOpen(false)
	}
	const handleCancelView = () => {
		setIsViewModalOpen(false)
	}
	// view modal end

	const navigate = useNavigate()
	const [newWord, setNewWord] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories_id: null,
		sinonims: [],
		antonims: [],
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
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
		axiosClassic
			.post('/api/words', newWord, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(res => setWordsCount(wordsCount + 1))
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
		setNewWord({ ...newWord, antonims: value })
		console.log(value)
	}
	const handleSinonimChange = value => {
		setNewWord({ ...newWord, sinonims: value })
		console.log(value)
	}

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
	}, [currPage, wordsCount])

	const logout = e => {
		e.preventDefault()
		localStorage.removeItem('token')
		navigate('/login', { replace: true })
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
					<div className='add-word'>
						<button onClick={() => showViewModal}>Add word</button>
						<div className='logout cursor-pointer' onClick={e => logout(e)}>
							<i className='bx bx-log-out'></i> Logout
						</div>
					</div>
				</header>
				<div className='table-wrapper'>
					<table className='copywriterTable'>
						<thead>
							<tr>
								<th>Latin</th>
								<th>Kiril</th>
								<th>Category</th>
								<th>Status</th>
								<th>View</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{dataTable.map(item => {
								return (
									<tr key={item.id}>
										<td>{item.latin}</td>
										<td>{item.kiril}</td>
										<td>{item.categories[0].latin}</td>
										<td>{item.status}</td>
										<td>
											<button onClick={() => showViewModal(item)}>
												<i className='bx bxs-show text-xl'></i>
											</button>
										</td>
										<td className='actions'>
											<div className='btns-wrapper'>
												<button className='editBtn'>
													<i className='bx bx-pencil'></i>
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
										setNewWord({
											...newWord,
											description_latin: e.target.value,
										})
									}
								/>
							</label>
							<label>
								<h2>Description_kiril:</h2>
								<textarea
									className='textarea'
									value={newWord.description_kiril}
									onChange={e =>
										setNewWord({
											...newWord,
											description_kiril: e.target.value,
										})
									}
								/>
							</label>
							<label>
								<h2>Audio: </h2>
								<input
									disabled
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
					<Modal
						className='showItemModal'
						open={isViewModalOpen}
						onOk={handleOkView}
						onCancel={handleCancelView}
						okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
						title={showItem.latin}
					>
						<div className='modal-item'>
							<h2>
								<span className='info'>Latin:</span>{' '}
								<span className='val'>{showItem.latin}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Kiril:</span>{' '}
								<span className='val'>{showItem.kiril}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Description_latin:</span>{' '}
								<span className='val'>{showItem.description_latin}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Description_kiril:</span>{' '}
								<span className='val'>{showItem.description_kiril}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Category:</span>{' '}
								<span className='val'>{showItem.categories[0]?.latin}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Status:</span>{' '}
								<span className='val'>{showItem.status}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Antonim:</span>{' '}
								<span className='val'>{showItem.antonyms}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Sinonim:</span>{' '}
								<span className='val'>{showItem.synonyms}</span>
							</h2>
						</div>
						<div className='modal-item'>
							<h2>
								<span className='info'>Audio:</span>{' '}
								<span className='val'>{showItem.audio}</span>
							</h2>
						</div>
					</Modal>
				</div>
			</Spin>
		</>
	)
}

export default Copywriter
