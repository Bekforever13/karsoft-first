import React from 'react'
import './Admins.scss'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import { Button, Table } from 'antd'

const Admins = () => {
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
					<Table></Table>
				</div>
			</main>
		</div>
	)
}

export default Admins
