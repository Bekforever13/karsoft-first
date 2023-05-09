import React, { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import { Select } from 'antd'
import axiosClassic from '../../../../../../api/axios'

const AddWord = ({
	setIsModalAddWordOpen,
	isModalAddWordOpen,
	allCategories,
	renderTable,
	setRenderTable,
}) => {
	const [allCategory, setAllCategory] = useState([])

	const handleOkAddWord = () => {
		setIsModalAddWordOpen(false)
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

	const handleCancelAddWord = () => {
		setIsModalAddWordOpen(false)
	}
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

	// useEffect to get all categories
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

	return (
		<Modal
			className='modalAddWord'
			title='Add new word'
			open={isModalAddWordOpen}
			onOk={handleOkAddWord}
			onCancel={handleCancelAddWord}
			okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
		>
			<div className='newWordForm'>
				<label>
					<h2>Latin:</h2>
					<input
						className='input'
						value={newWord.latin}
						onChange={e => setNewWord({ ...newWord, latin: e.target.value })}
						type='text'
					/>
				</label>
				<label>
					<h2>Kiril:</h2>
					<input
						className='input'
						value={newWord.kiril}
						onChange={e => setNewWord({ ...newWord, kiril: e.target.value })}
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
						type='text'
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
						type='text'
					/>
				</label>
				<label>
					<h2>Audio: </h2>
					<input
						className='audio'
						onChange={e => setNewWord({ ...newWord, audio: e.target.files })}
						type='file'
					/>
				</label>
				<label>
					<h2>Category:</h2>
					<Select
						className={'select'}
						defaultValue={'select'}
						onChange={e => {
							allCategory.map(item =>
								item.latin === e
									? setNewWord({ ...newWord, categories_id: item.id })
									: ''
							)
						}}
					>
						{allCategory.map(category => {
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
	)
}

export default AddWord
