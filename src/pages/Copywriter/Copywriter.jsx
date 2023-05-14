import { Pagination, Modal, Select, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Copywriter.scss'
import axiosClassic from '../../api/axios'
import { Context } from '../../App'
import moment from 'moment'

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

	const [sinOptions, setSinOptions] = useState([])
	const [antOptions, setAntOptions] = useState([])

	useEffect(() => {
		axiosClassic.get(`/api/words?limit=500&`).then(res => {
			return res.data.data.map(item => {
				setAntOptions(el => {
					return [...el, { label: item.latin, value: item.id }]
				})
				setSinOptions(el => {
					return [...el, { label: item.latin, value: item.id }]
				})
			})
		})
	}, [])

	const handleAntChange = value => {
		setNewWord({ ...newWord, antonims: value })
	}
	const handleSinChange = value => {
		setNewWord({ ...newWord, sinonims: value })
	}

	//  ------>>>>>  edit modal start <<<<< -------
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [dataForEdit, setDataForEdit] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories: [],
		synonyms: [],
		antonyms: [],
	})

	const [idOfWord, setIdOfWord] = useState(0)
	const showModal = item => {
		console.log(item)
		setIdOfWord(item.id)
		setDataForEdit({
			latin: item.latin,
			kiril: item.kiril,
			description_latin: item.description_latin,
			description_kiril: item.description_kiril,
			categories: item.categories[0].kiril,
			synonyms: [],
			antonyms: [],
		})
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
		axiosClassic
			.post(`/api/words/${idOfWord}`, dataForEdit, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(() => setWordsCount(wordsCount + 1))
			.catch(err => {
				console.log('123', err)
				console.log(idOfWord)
			})
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	// edit modal end

	// ------>>>>> add word modal start <<<<< -------
	const [newWord, setNewWord] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories_id: null,
		sinonims: [],
		antonims: [],
	})
	const [wordsCount, setWordsCount] = useState(0)
	//words count effect
	useEffect(() => {
		axiosClassic
			.get('/api/wordsdate?limit=1000', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setWordsCount(res.data.total))
	}, [wordsCount])

	const [addWordModalOpen, setAddWordModalOpen] = useState(false)

	const showAddWordModal = () => {
		setAddWordModalOpen(true)
	}
	const handleAddWordOk = () => {
		setAddWordModalOpen(false)
		axiosClassic
			.post('/api/words', newWord, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(res => {
				console.log(newWord)
				setWordsCount(wordsCount + 1)
			})
			.catch(err => console.log(err))
	}
	const handleAddWordCancel = () => {
		setAddWordModalOpen(false)
		setNewWord({
			latin: '',
			kiril: '',
			description_latin: '',
			description_kiril: '',
			categories_id: null,
			sinonims: [],
			antonims: [],
		})
	}
	// add word modal end
	// antonim sinonim for ADD NEW WORD  start
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
	}
	const handleSinonimChange = value => {
		setNewWord({ ...newWord, sinonims: value })
	}
	// antonim sinonim things end

	const [dataTable, setDataTable] = useState([])
	const [currPage, setCurrPage] = useState(1)

	// table render
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

	const [currentUser, setCurrentUser] = useState([])

	//check
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

	return (
		<>
			<Spin spinning={loading}>
				<header className='copywriter-header'>
					<div className='header-logo'>
						<Link to={'/copywriter'}>
							<img src='../../../public/img/logo.svg' alt='' />
						</Link>
					</div>
					<div className='user text-xl'>{currentUser.name}</div>
					<div className='add-word'>
						<button onClick={showAddWordModal}>Add word</button>
						<div className='logout cursor-pointer' onClick={e => logout(e)}>
							<i className='bx bx-log-out'></i> Logout
						</div>
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
							{dataTable.map(item => {
								return (
									<tr key={item.id}>
										<td>{item.id}</td>
										<td>
											{moment(item.created_at).format('MM-D-YYYY, h:mm:ss')}
										</td>
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
												<button
													onClick={() => showModal(item)}
													className='editBtn'
												>
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

					{/* &&& modal for edit word starts here &&& */}
					<Modal
						className='copywriterModal'
						title='Edit word'
						open={isModalOpen}
						width={'850px'}
						height={'650px'}
						onOk={handleOk}
						onCancel={handleCancel}
						okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
					>
						<div className='newWordForm'>
							<label>
								<h2>Latin:</h2>
								<input
									className='input'
									value={dataForEdit.latin}
									onChange={e =>
										setDataForEdit({ ...dataForEdit, latin: e.target.value })
									}
									type='text'
								/>
							</label>
							<label>
								<h2>Kiril:</h2>
								<input
									className='input'
									value={dataForEdit.kiril}
									onChange={e =>
										setDataForEdit({ ...dataForEdit, kiril: e.target.value })
									}
									type='text'
								/>
							</label>
							<label>
								<h2>Description_latin:</h2>
								<textarea
									className='textarea'
									value={dataForEdit.description_latin}
									onChange={e =>
										setDataForEdit({
											...dataForEdit,
											description_latin: e.target.value,
										})
									}
								/>
							</label>
							<label>
								<h2>Description_kiril:</h2>
								<textarea
									className='textarea'
									value={dataForEdit.description_kiril}
									onChange={e =>
										setDataForEdit({
											...dataForEdit,
											description_kiril: e.target.value,
										})
									}
								/>
							</label>
							<label>
								<h2>Category:</h2>
								<Select
									className='select'
									value={dataForEdit.categories[0]} ///////////need update
									onChange={e => {
										hammeCategory.map(item =>
											item.latin === e
												? setDataForEdit({
														...dataForEdit,
														categories_id: item.id,
												  })
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
									onChange={handleAntChange}
									options={antOptions}
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
									onChange={handleSinChange}
									options={sinOptions}
								/>
							</label>
						</div>
					</Modal>
					{/* &&& modal for edit word ends here &&& */}

					{/* ****  modal for add new word starts here**** PS: didn't change classname but works well */}
					<Modal
						className='copywriterModal'
						title='Add new word'
						open={addWordModalOpen}
						width={'850px'}
						height={'650px'}
						onOk={handleAddWordOk}
						onCancel={handleAddWordCancel}
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
								<h2>Category:</h2>
								<Select
									className='select'
									defaultValue={'select'}
									value={newWord.categories_id}
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
					{/* **** modal for add new word ends here **** */}

					{/*  ^^^^^^  modal for view word info starts here ^^^^^^ */}
					<Modal
						className='showItemModal'
						open={isViewModalOpen}
						onOk={handleOkView}
						width={'850px'}
						onCancel={handleCancelView}
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
					{/*  ^^^^^^  modal for view word info ends here ^^^^^^ */}
				</div>
			</Spin>
		</>
	)
}

export default Copywriter
