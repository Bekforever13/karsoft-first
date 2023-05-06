import { axiosClassic } from '../../../../api/axios'
import React, { useContext, useEffect, useState } from 'react'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import './AdminHome.scss'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../../App'
import Table from '../AdminComponents/Table/TableHome/Table'
import Table2 from '../AdminComponents/Table/TableHome/Table2'

const AdminHome = () => {
	const navigate = useNavigate()

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
						517 sóz
					</div>
					<div className='category'>
						<span>
							<i className='bx bxs-category'></i>
						</span>{' '}
						10 category
					</div>
				</article>
				<section className='section'>
					<div className='tables'>
						<article className='firstTable'>
							<h2>Sózler sáne boyınsha</h2>
							<Table />
						</article>
						<article className='secondTable'>
							<h2>Kategoriya</h2>
							<Table2 />
						</article>
					</div>
				</section>
			</main>
		</div>
	)
}

export default AdminHome
