import React from 'react'
import Modal from 'antd/es/modal/Modal'
import { Select } from 'antd'

const AddCategory = ({
	handleCancelAddCategory,
	handleOkAddCategory,
	isModalAddCategoryOpen,
	setIsModalAddCategoryOpen,
}) => {
	return (
		<Modal
			title='Basic Modal'
			open={isModalAddCategoryOpen}
			onOk={handleOkAddCategory}
			onCancel={handleCancelAddCategory}
			okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
		>
			<form>
				<div className='newWordForm'>
					<label>
						<h2>asdasdasd</h2>
						<input type='text' />
					</label>
					<label>
						<h2>Kiril</h2>
						<input type='text' />
					</label>
					<label>
						<h2>Latin_description</h2>
						<input type='text' />
					</label>
					<label>
						<h2>Kiril_description</h2>
						<input type='text' />
					</label>
					<label>
						<h2>Category</h2>
						<Select>
							<Select.Option value='category'>1</Select.Option>
							<Select.Option value='category'>2</Select.Option>
							<Select.Option value='category'>3</Select.Option>
						</Select>
					</label>
				</div>
			</form>
		</Modal>
	)
}

export default AddCategory
