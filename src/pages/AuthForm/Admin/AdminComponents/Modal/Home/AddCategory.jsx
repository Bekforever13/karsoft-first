import React, { useContext, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import axiosClassic from '../../../../../../api/axios'
import { Context } from '../../../../../../App'

const AddCategory = ({
	isModalAddCategoryOpen,
	setIsModalAddCategoryOpen,
	renderTable2,
	setRenderTable2,
}) => {
	const [newCategory, setNewCategory] = useState({ latin: '', kiril: '' })

	const handleOkAddCategory = () => {
		setIsModalAddCategoryOpen(false)
		axiosClassic
			.post('/api/categories', newCategory, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(() => setRenderTable2(renderTable2 + 1))
		setNewCategory({
			latin: '',
			kiril: '',
		})
	}
	const handleCancelAddCategory = () => {
		setIsModalAddCategoryOpen(false)
	}

	return (
		<Modal
			className={'categoryModal'}
			title='Add new category'
			open={isModalAddCategoryOpen}
			onOk={handleOkAddCategory}
			onCancel={handleCancelAddCategory}
			okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
		>
			<div className='newCategoryForm'>
				<label className='catLabel'>
					<h2>Latin</h2>
					<input
						type='text'
						onChange={e =>
							setNewCategory({ ...newCategory, latin: e.target.value })
						}
						value={newCategory.latin}
					/>
				</label>
				<label className='catLabel'>
					<h2>Kiril</h2>
					<input
						type='text'
						onChange={e =>
							setNewCategory({ ...newCategory, kiril: e.target.value })
						}
						value={newCategory.kiril}
					/>
				</label>
			</div>
		</Modal>
	)
}

export default AddCategory
