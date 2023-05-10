import {
	AppstoreOutlined,
	ContainerOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { useState } from 'react'
import Login from '../../../../Login/Login'
import AdminCategory from '../../../AdminCategory/AdminCategory'
import AdminHome from '../../../AdminHome/AdminHome'
import Admins from '../../../Admins/Admins'
import AdminWord from '../../../AdminWord/AdminWord'

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	}
}
const items = [
	getItem('Home', '1', <AdminHome />),
	getItem('Sozler', '2', <AdminWord />),
	getItem('Kategoriya', '3', <AdminCategory />),
	getItem('Admins', '3', <Admins />),
	getItem('Logout', '3', <Login />),
]

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false)
	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}
	return (
		<div
			style={{
				width: 256,
			}}
		>
			<Button
				type='primary'
				onClick={toggleCollapsed}
				style={{
					marginBottom: 16,
				}}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode='inline'
				theme='dark'
				inlineCollapsed={collapsed}
				items={items}
			/>
		</div>
	)
}
export default Sidebar
