import React from 'react'
import './AdminWord.scss'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import { Button, Table } from 'antd'

const AdminWord = () => {
	return (
		<div className='adminWords'>
			<Aside />
			<main>
				<Input />
				<div className='adminWordsTable'>
					<div className='adminWordsTitle'>
						<h2>Sózler</h2>
						<Button type='primary' size={'large'}>
							Add word
						</Button>
					</div>
					<Table></Table>
				</div>
			</main>
		</div>
	)
}

export default AdminWord