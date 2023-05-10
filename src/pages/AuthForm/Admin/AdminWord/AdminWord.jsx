import React, { useState } from 'react'
import './AdminWord.scss'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import { Button } from 'antd'
import TableSozler from './TableSozler/TableSozler'
import AddWord from '../AdminComponents/Modal/Home/AddWord'

const AdminWord = () => {
	const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)
	const showModalAddWord = () => {
		setIsModalAddWordOpen(true)
	}

	return (
		<>
			<div className='adminWords'>
				<Aside />
				<main>
					<Input />
					<div className='adminWordsTable'>
						<div className='adminWordsTitle'>
							<h2>Sózler</h2>
							<Button type='primary' onClick={showModalAddWord} size={'large'}>
								Add word
							</Button>
							<AddWord
								isModalAddWordOpen={isModalAddWordOpen}
								setIsModalAddWordOpen={setIsModalAddWordOpen}
							/>
						</div>
						<TableSozler />
					</div>
				</main>
			</div>
		</>
	)
}

export default AdminWord
