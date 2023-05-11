import React, { useState } from 'react'
import './AdminWord.scss'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import { Button, Spin } from 'antd'
import TableSozler from './TableSozler/TableSozler'
import AddWord from '../AdminComponents/Modal/Home/AddWord'

const AdminWord = () => {
	const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const showModalAddWord = () => {
		setIsModalAddWordOpen(true)
	}

	return (
		<>
			<Spin spinning={loading}>
				<div className='adminWords'>
					<Aside />
					<main>
						<Input />
						<div className='adminWordsTable'>
							<div className='adminWordsTitle'>
								<h2>Sózler</h2>
								<Button
									type='primary'
									onClick={showModalAddWord}
									size={'large'}
								>
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
			</Spin>
		</>
	)
}

export default AdminWord
