import React from 'react'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import './AdminCategory.scss'
import { Button, Table } from 'antd'

const AdminCategory = () => {
	return (
		<div className='adminCategory'>
			<Aside />
			<main>
				<Input />
				<div className='adminCategoryTable'>
					<div className='adminCategoryTitle'>
						<h2>Kategoriya</h2>
						<Button type='primary' size={'large'}>
							Add Category
						</Button>
					</div>
					<Table></Table>
				</div>
			</main>
		</div>
	)
}

export default AdminCategory