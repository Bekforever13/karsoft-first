import React, { useEffect, useState } from 'react'
import './Admins.scss'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import { Button, Spin, Table, Modal, Select } from 'antd'
import axiosClassic from '../../../../api/axios'
import Column from 'antd/es/table/Column'

const Admins = () => {
	const [dataSource, setDataSource] = useState([])
	const [loading, setLoading] = useState(false)
	const [allRoles, setAllRoles] = useState([])
	const [totalAdmins, setTotalAdmins] = useState(0)
	const [newAdmin, setNewAdmin] = useState({
		name: '',
		phone: '',
		password: '',
		confirm_password: '',
		role_name: '',
	})

	useEffect(() => {
		axiosClassic
			.get('/api/roles', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setAllRoles(res.data.data))
	}, [])

	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
		axiosClassic
			.post('/api/admins', newAdmin, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setTotalAdmins(totalAdmins + 1))
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	useEffect(() => {
		setLoading(true)
		axiosClassic
			.get('/api/admins', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setDataSource(res.data.data)
				setTotalAdmins(res.data.total)
			})
			.finally(() => setLoading(false))
	}, [totalAdmins])

	return (
		<Spin spinning={loading}>
			<div className='admins'>
				<Aside />
				<main>
					<Input />
					<div className='adminsTable'>
						<div className='adminsTitle'>
							<h2>Admins</h2>
							<Button type='primary' onClick={showModal} size={'large'}>
								Add admin
							</Button>
						</div>
						<Table dataSource={dataSource}>
							<Column title='Name' dataIndex='name' key='name' />
							<Column title='Phone' dataIndex='phone' key='phone' />
							<Column title='Role' dataIndex='role' key='role' />
							<Column
								title='Actions'
								dataIndex='actions'
								key='actions'
								render={() => (
									<div className='adminsActionButtons'>
										<button className='editBtn' onClick={e => console.log(e)}>
											<i className='bx bx-pencil'></i>
										</button>
										<button className='deleteBtn' onClick={e => console.log(e)}>
											<i className='bx bx-trash'></i>
										</button>
									</div>
								)}
							/>
						</Table>
					</div>
				</main>
				<Modal
					className={'adminsModal'}
					title='Add new admin'
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
				>
					<div className='newAdminForm'>
						<label className='adminLabel'>
							<h2>Name: </h2>
							<input
								type='text'
								onChange={e =>
									setNewAdmin({ ...newAdmin, name: e.target.value })
								}
								value={newAdmin.name}
							/>
						</label>
						<label className='adminLabel'>
							<h2>Phone:</h2>
							<input
								type='text'
								onChange={e =>
									setNewAdmin({ ...newAdmin, phone: e.target.value })
								}
								value={newAdmin.phone}
							/>
						</label>
						<label className='adminLabel'>
							<h2>Password:</h2>
							<input
								type='text'
								onChange={e =>
									setNewAdmin({ ...newAdmin, password: e.target.value })
								}
								value={newAdmin.password}
							/>
						</label>
						<label className='adminLabel'>
							<h2>Confirm Password:</h2>
							<input
								type='text'
								onChange={e =>
									setNewAdmin({ ...newAdmin, confirm_password: e.target.value })
								}
								value={newAdmin.confirm_password}
							/>
						</label>
						<label className='adminLabel'>
							<h2>Role:</h2>
							<Select
								className='select'
								defaultValue={'select'}
								onChange={e => setNewAdmin({ ...newAdmin, role_name: e })}
							>
								{allRoles.map(role => {
									return (
										<Select.Option key={role.name}>{role.name}</Select.Option>
									)
								})}
							</Select>
						</label>
					</div>
				</Modal>
			</div>
		</Spin>
	)
}

export default Admins
