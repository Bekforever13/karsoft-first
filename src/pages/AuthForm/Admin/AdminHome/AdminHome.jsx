import { axiosClassic } from '../../../../api/axios'
import React, { useContext, useEffect, useState } from 'react'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import './AdminHome.scss'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../../App'
import Table from '../AdminComponents/Table/TableHome/Table'
import Table2 from '../AdminComponents/Table/TableHome/Table2'
import Modal from 'antd/es/modal/Modal'
import { Button, Select } from 'antd'

const AdminHome = () => {
	const navigate = useNavigate()
	const [totalWords, setTotalWords] = useState(0)
	const [totalCategory, setTotalCategory] = useState(0)

	// useEffect for total words
	useEffect(() => {
		axiosClassic
			.get(`/api/wordsdate?`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setTotalWords(res.data.total))
	}, [])

	//useEffect for total categories
	useEffect(() => {
		axiosClassic
			.get(`/api/categoriesdate?`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setTotalCategory(res.data.total))
	}, [])

	// useEffect(() => {
	// 	axiosClassic
	// 		.get('/api/check', {
	// 			headers: {
	// 				Authorization: 'Bearer ' + localStorage.getItem('token'),
	// 			},
	// 		})
	// 		.then(res => console.log(res))
	// 		.catch(err => {
	// 			navigate('/login', { replace: true })
	// 		})
	// }, [])

	const [isModalOpen, setIsModalOpen] = useState(false)
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<div className='AdmHome'>
			<Aside />
			<main>
				<Input />
				<article className='soz-category'>
					<div className='soz'>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
								/>
							</svg>
						</span>
						{totalWords} sóz
					</div>
					<div className='category'>
						<span>
							<i className='bx bxs-category'></i>
						</span>{' '}
						{totalCategory} category
					</div>
				</article>
				<section className='section'>
					<div className='tables'>
						<article className='firstTable'>
							<div className='tableTitle'>
								<h2>Sózler sáne boyınsha</h2>
								<button onClick={showModal}>Add word</button>
								<Modal
									title='Basic Modal'
									open={isModalOpen}
									onOk={handleOk}
									onCancel={handleCancel}
								>
									<p>Some contents...</p>
									<p>Some contents...</p>
									<p>Some contents...</p>
								</Modal>
							</div>
							<Table />
						</article>
						<article className='secondTable'>
							<div className='tableTitle'>
								<h2>Kategoriya</h2>
								<button onClick={showModal}>Add word</button>
								<Modal
									title='Basic Modal'
									open={isModalOpen}
									onOk={handleOk}
									onCancel={handleCancel}
									okButtonProps={{ style: { backgroundColor: '#6d6df8' } }}
								>
									<form>
										<h1>Add new word</h1>
										<div className='newWordForm'>
											<label>
												<h2>Latin</h2>
												<input type='text' />
											</label>
											<label>
												<h2>Kiril</h2>
												<input type='text' />
											</label>
											<label>
												<h2>Latin_description</h2>
												<input type='text' />
											</label>
											<label>
												<h2>Kiril_description</h2>
												<input type='text' />
											</label>
											<label>
												<h2>Category</h2>
												<Select>
													<Select.Option value='category'>1</Select.Option>
													<Select.Option value='category'>2</Select.Option>
													<Select.Option value='category'>3</Select.Option>
												</Select>
											</label>
										</div>
									</form>
								</Modal>
							</div>
							<Table2 />
						</article>
					</div>
				</section>
			</main>
		</div>
	)
}

export default AdminHome
