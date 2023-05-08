import React from 'react'
import Modal from 'antd/es/modal/Modal'
import { Select } from 'antd'

const AddWord = ({
	handleCancelAddWord,
	handleOkAddWord,
	setIsModalAddWordOpen,
	isModalAddWordOpen,
	allCategories,
}) => {
	function a(e) {
		return console.log(e)
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
					<input className='input' type='text' />
				</label>
				<label>
					<h2>Kiril:</h2>
					<input className='input' type='text' />
				</label>
				<label>
					<h2>Description_latin:</h2>
					<input className='input' type='text' />
				</label>
				<label>
					<h2>Description_kiril:</h2>
					<input className='input' type='text' />
				</label>
				<label>
					<h2>Audio: </h2>
					<input className='audio' type='file' />
				</label>
				<label>
					<h2>Category:</h2>
					<Select defaultValue={'select'} className={'select'}>
						{allCategories.reverse().map(category => {
							return (
								<Select.Option key={category.id}>
									{category.latin}
								</Select.Option>
							)
						})}
					</Select>
				</label>
			</div>
		</Modal>
	)
}

export default AddWord
