import React, { useState } from 'react'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import './AdminCategory.scss'
import { Button, Modal, Spin } from 'antd'
import CategoryTable from './Table/CategoryTable'
import axiosClassic from '../../../../api/axios'
import AddCategory from '../AdminComponents/Modal/Home/AddCategory'

const AdminCategory = () => {
	const [loading, setLoading] = useState(false)
	const [render, setRender] = useState(0)
	const [newCategory, setNewCategory] = useState({ latin: '', kiril: '' })
	const [isModalAddCategoryOpen, setIsModalAddCategoryOpen] = useState(false)

	const showModalAddCategory = () => {
		setIsModalAddCategoryOpen(true)
	}
	const handleOkAddCategory = () => {
		setIsModalAddCategoryOpen(false)
		console.log(newCategory)
		axiosClassic
			.post('/api/categories', newCategory, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setRender(render + 1))
			.finally(() => setNewCategory({ latin: '', kiril: '' }))
	}
	const handleCancelAddCategory = () => {
		setIsModalAddCategoryOpen(false)
	}

	return (
		<Spin spinning={loading}>
			<div className='admCateg'>
				<Aside />
				<div className='adminCategory'>
					<main>
						<Input />
						<div className='adminCategoryTable'>
							<div className='adminCategoryTitle'>
								<h2>Kategoriya</h2>
								<Button
									type='primary'
									onClick={showModalAddCategory}
									size={'large'}
								>
									Add Category
								</Button>
							</div>
							<CategoryTable setRender={setRender} render={render} />
						</div>
					</main>
				</div>
				{/* <AddCategory /> */}
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
			</div>
		</Spin>
	)
}

export default AdminCategory
