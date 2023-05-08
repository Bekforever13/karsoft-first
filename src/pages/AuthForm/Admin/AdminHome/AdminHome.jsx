import React, { useContext, useEffect, useState } from 'react'
import axiosClassic from '../../../../api/axios'
import Aside from '../AdminComponents/Aside/Aside'
import Input from '../AdminComponents/Input/Input'
import './AdminHome.scss'
import { useNavigate } from 'react-router-dom'
import Table from './TableHome/Table'
import Table2 from './TableHome/Table2'
import AddCategory from '../AdminComponents/Modal/Home/AddCategory'
import AddWord from '../AdminComponents/Modal/Home/AddWord'

const AdminHome = () => {
	const navigate = useNavigate()
	const [totalWords, setTotalWords] = useState(0)
	const [totalCategory, setTotalCategory] = useState(0)
	const [allCategories, setAllCategories] = useState([])

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
			.get(`/api/categoriesdate?limit=500`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setTotalCategory(res.data.total)
				setAllCategories(res.data.data)
			})
	}, [])

	//useeffect for check have token or not
	useEffect(() => {
		axiosClassic
			.get('/api/check', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => console.log(res.data))
			.catch(err => {
				navigate('/login', { replace: true })
			})
	}, [])

	const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)
	const [isModalAddCategoryOpen, setIsModalAddCategoryOpen] = useState(false)
	const showModalAddWord = () => {
		setIsModalAddWordOpen(true)
	}
	const handleOkAddWord = () => {
		setIsModalAddWordOpen(false)
	}
	const handleCancelAddWord = () => {
		setIsModalAddWordOpen(false)
	}
	const showModalAddCategory = () => {
		setIsModalAddCategoryOpen(true)
	}
	const handleOkAddCategory = () => {
		setIsModalAddCategoryOpen(false)
	}
	const handleCancelAddCategory = () => {
		setIsModalAddCategoryOpen(false)
	}

	return (
		<>
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
									<button onClick={showModalAddWord}>Add word</button>
									<AddWord
										handleOkAddWord={handleOkAddWord}
										handleCancelAddWord={handleCancelAddWord}
										isModalAddWordOpen={isModalAddWordOpen}
										setIsModalAddWordOpen={setIsModalAddWordOpen}
										allCategories={allCategories}
									/>
								</div>
								<Table />
							</article>
							<article className='secondTable'>
								<div className='tableTitle'>
									<h2>Kategoriya</h2>
									<button onClick={showModalAddCategory}>Add word</button>
									<AddCategory
										handleOkAddCategory={handleOkAddCategory}
										handleCancelAddCategory={handleCancelAddCategory}
										setIsModalAddCategoryOpen={setIsModalAddCategoryOpen}
										isModalAddCategoryOpen={isModalAddCategoryOpen}
									/>
								</div>
								<Table2 />
							</article>
						</div>
					</section>
				</main>
			</div>
		</>
	)
}

export default AdminHome
