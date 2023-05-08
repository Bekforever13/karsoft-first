import React from 'react'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import './AdminCategory.scss'
import { Button, Table } from 'antd'
import CategoryTable from './Table/CategoryTable'

const AdminCategory = () => {
	return (
		<div className='admCateg'>
			<Aside />
			<div className='adminCategory'>
				<main>
					<Input />
					<div className='adminCategoryTable'>
						<div className='adminCategoryTitle'>
							<h2>Kategoriya</h2>
							<Button type='primary' size={'large'}>
								Add Category
							</Button>
						</div>
						<CategoryTable />
					</div>
				</main>
			</div>
		</div>
	)
}

export default AdminCategory
