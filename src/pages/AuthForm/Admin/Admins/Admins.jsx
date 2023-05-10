import React, { useEffect, useState } from 'react'
import './Admins.scss'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import { Button, Table } from 'antd'
import axiosClassic from '../../../../api/axios'
import Column from 'antd/es/table/Column'

const Admins = () => {
	const [dataSource, setDataSource] = useState([])

	useEffect(() => {
		axiosClassic
			.get('/api/admins', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setDataSource(res.data.data))
	}, [])
	console.log(dataSource)
	return (
		<div className='admins'>
			<Aside />
			<main>
				<Input />
				<div className='adminsTable'>
					<div className='adminsTitle'>
						<h2>Admins</h2>
						<Button type='primary' size={'large'}>
							Add admin
						</Button>
					</div>
					<Table dataSource={dataSource}>
						<Column title='Id' dataIndex='id' key='id' />
						<Column title='Name' dataIndex='name' key='name' />
						<Column title='Phone' dataIndex='phone' key='phone' />
						<Column title='Role' dataIndex='role' key='role' />
					</Table>
				</div>
			</main>
		</div>
	)
}

export default Admins
