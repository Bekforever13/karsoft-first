import { Pagination, Modal, Select, Spin, Button } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Copywriter.scss'
import axiosClassic from '../../api/axios'
import { Context } from '../../App'
import moment from 'moment'

const Copywriter = () => {
	const [kirilToLatinWord, setKirilToLatinWord] = useState({
		kiril: '',
	})
	const [convertedWord, setConvertedWord] = useState({
		latin: '',
	})
	const [description, setDescription] = useState({
		kiril: '',
	})
	const [convertedDescription, setConvertedDescription] = useState({
		latin: '',
	})
	const [hammeCategory, setHammeCategory] = useState([])
	const [sinOptions, setSinOptions] = useState([])
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
	const [antOptions, setAntOptions] = useState([])
	const navigate = useNavigate()
	const [sinonimOptions, setSinonimOptions] = useState([])
	const [antonimOptions, setAntonimOptions] = useState([])
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
	const [addWordModalOpen, setAddWordModalOpen] = useState(false)
	const [isViewModalOpen, setIsViewModalOpen] = useState(false)
	const [dataTable, setDataTable] = useState([])
	const [currPage, setCurrPage] = useState(1)
	const [showItem, setShowItem] = useState({
		latin: '',
		kiril: '',
		description_latin: '',
		description_kiril: '',
		categories: [],
		synonyms: [],
		antonyms: [],
	})
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
	const [currentUser, setCurrentUser] = useState([])

	// view modal start

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

	// hamme category
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

	const showModal = item => {
		console.log(item)
		setDataForEdit({
			id: item.id,
			latin: item.latin,
			kiril: item.kiril,
			description_latin: item.description_latin,
			description_kiril: item.description_kiril,
			categories: item.categories_id,
			synonyms: item.synonyms,
			antonyms: item.antonyms,
			status: item.status,
		})
		setConvertedWord({ latin: item.latin })
		setConvertedWord({ latin: item.latin })
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
		setLoading(true)
		axiosClassic
			.post(`/api/words/${dataForEdit.id}`, dataForEdit, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(() => setWordsCount(wordsCount + 1))
			.catch(err => {
				console.log(err)
			})
			.finally(() => setLoading(false))
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		setDataForEdit({
			latin: '',
			kiril: '',
			description_latin: '',
			description_kiril: '',
			categories: [],
			synonyms: [],
			antonyms: [],
		})
	}
	// edit modal end

	// ------>>>>> add word modal start <<<<< -------

	//words count effect
	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get('/api/words_copytest?status=approved', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setWordsCount(res.data.total))
			.finally(() => setLoading(false))
	}, [wordsCount])

	const showAddWordModal = () => {
		setAddWordModalOpen(true)
	}
	const handleAddWordOk = () => {
		setLoading(true)
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
			.finally(() => setLoading(false))
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

	const kirilToLatin = () => {
		axiosClassic
			.post('/api/kiriltolatin', kirilToLatinWord, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setConvertedWord({
					kiril: res.data.kiril,
					latin: res.data.latin,
				})
				setNewWord({ ...newWord, latin: res.data.latin })
				setDataForEdit({ ...dataForEdit, latin: res.data.latin })
			})
	}
	const convertDescription = () => {
		axiosClassic
			.post('/api/kiriltolatin', description, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setConvertedDescription({ latin: res.data.latin })
				setNewWord({ ...newWord, description_latin: res.data.latin })
				setDataForEdit({ ...dataForEdit, description_latin: res.data.latin })
			})
	}

	const handleAntonimChange = value => {
		setNewWord({ ...newWord, antonims: value })
	}
	const handleSinonimChange = value => {
		setNewWord({ ...newWord, sinonims: value })
	}
	// antonim sinonim things end

	// table render
	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get(`/api/words_copytest?page=${currPage}&limit=10&status=approved`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setDataTable(res.data.data))
			.finally(() => setLoading(false))
	}, [currPage, wordsCount])

	const logout = e => {
		e.preventDefault()
		localStorage.removeItem('token')
		navigate('/login', { replace: true })
	}

	//check
	useEffect(() => {
		setLoading(true)
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
			.finally(() => setLoading(false))
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
								<th className='th'>ID</th>
								<th className='th'>Created at</th>
								<th className='th'>Latin</th>
								<th className='th'>Kiril</th>
								<th className='th'>Category</th>
								<th className='th'>Status</th>
								<th className='th'>View</th>
								<th className='th'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{dataTable
								?.filter(x => x.status !== 'approved')
								.map(item => {
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
														disabled={item.status !== 'canceled'}
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
						footer={[
							<div key={'btns'} className='btns'>
								<div className='left-btns'>
									<Button
										key={'kirilToLatin'}
										className='convert-btn'
										onClick={kirilToLatin}
									>
										Convert Word
									</Button>
									<Button
										key={'convertDescription'}
										className='convert-btn'
										onClick={convertDescription}
									>
										Convert Description
									</Button>
								</div>
								<div className='right-btns'>
									<Button
										key={'cancel'}
										className='cancel-btn'
										onClick={handleCancel}
									>
										Cancel
									</Button>

									<Button
										key={'ok'}
										type='primary'
										className='ok-btn'
										onClick={handleOk}
									>
										Ok
									</Button>
								</div>
							</div>,
						]}
						onCancel={handleCancel}
						okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
					>
						<div className='newWordForm'>
							<label>
								<h2>Kiril:</h2>
								<input
									className='input'
									value={dataForEdit?.kiril || kirilToLatinWord.kiril}
									onChange={e => {
										setKirilToLatinWord({
											kiril: e.target.value,
										})
										setDataForEdit({ ...dataForEdit, kiril: e.target.value })
									}}
									type='text'
								/>
							</label>
							<label>
								<h2>Latin:</h2>
								<input
									className='input'
									value={dataForEdit?.latin || convertedWord?.latin}
									onChange={e =>
										setDataForEdit({ ...dataForEdit, latin: e.target.value })
									}
									type='text'
								/>
							</label>

							<label>
								<h2>Description_kiril:</h2>
								<textarea
									className='textarea'
									value={dataForEdit?.description_kiril || description.kiril}
									onChange={e => {
										setDescription({ kiril: e.target.value })
										setDataForEdit({
											...dataForEdit,
											description_kiril: e.target.value,
										})
									}}
								/>
							</label>
							<label>
								<h2>Description_latin:</h2>
								<textarea
									className='textarea'
									value={
										dataForEdit?.description_latin ||
										convertedDescription?.latin
									}
									onChange={e =>
										setDataForEdit({
											...dataForEdit,
											description_latin: e.target.value,
										})
									}
								/>
							</label>
							<label>
								<h2>Category:</h2>
								<Select
									className='select'
									value={dataForEdit.categories_id}
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
						centered={true}
						width={'850px'}
						height={'650px'}
						footer={[
							<div key={'btns'} className='btns'>
								<div className='left-btns'>
									<Button
										key={'kirilToLatin'}
										className='convert-btn'
										onClick={kirilToLatin}
									>
										Convert Word
									</Button>
									<Button
										key={'convertDescription'}
										className='convert-btn'
										onClick={convertDescription}
									>
										Convert Description
									</Button>
								</div>

								<div className='right-btns'>
									<Button
										key={'cancel'}
										className='cancel-btn'
										onClick={handleAddWordCancel}
									>
										Cancel
									</Button>

									<Button
										key={'ok'}
										type='primary'
										className='ok-btn'
										onClick={handleAddWordOk}
									>
										Ok
									</Button>
								</div>
							</div>,
						]}
						onCancel={handleAddWordCancel}
						okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
					>
						<div className='newWordForm'>
							<label>
								<h2>Kiril:</h2>
								<input
									className='input'
									value={kirilToLatinWord.kiril}
									onChange={e => {
										setKirilToLatinWord({
											kiril: e.target.value,
										})
										setNewWord({ ...newWord, kiril: e.target.value })
									}}
									type='text'
								/>
							</label>
							<label>
								<h2>Latin:</h2>
								<input
									className='input'
									value={convertedWord?.latin}
									onChange={e => {
										setNewWord({
											...newWord,
											latin: e.target.value,
										})
									}}
									type='text'
								/>
							</label>

							<label>
								<h2>Description_kiril:</h2>
								<textarea
									className='textarea'
									value={description.kiril}
									onChange={e => {
										setDescription({
											kiril: e.target.value,
										})
										setNewWord({
											...newWord,
											description_kiril: e.target.value,
										})
									}}
								/>
							</label>
							<label>
								<h2>Description_latin:</h2>
								<textarea
									className='textarea'
									value={convertedDescription?.latin}
									onChange={e =>
										setNewWord({
											...newWord,
											description_latin: e.target.value,
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
						width={'1000px'}
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
