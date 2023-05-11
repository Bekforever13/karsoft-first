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
import { Context } from '../../../../App'
import { Spin } from 'antd'

const AdminHome = () => {
	const [
		allWordsArray,
		page,
		setPage,
		lang,
		setLang,
		totalCategory,
		allCategory,
		totalWords,
	] = useContext(Context)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	// check have token or not
	useEffect(() => {
		axiosClassic
			.get('/api/check', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.catch(err => {
				navigate('/login', { replace: true })
			})
			.finally(() => setLoading(false))
	}, [])

	const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)
	const [isModalAddCategoryOpen, setIsModalAddCategoryOpen] = useState(false)
	const showModalAddWord = () => {
		setIsModalAddWordOpen(true)
	}
	const showModalAddCategory = () => {
		setIsModalAddCategoryOpen(true)
	}

	return (
		<>
			<div className='AdmHome'>
				<Aside />
				<main>
					<Spin spinning={loading}>
						<Input />
						<section className='section'>
							<div className='tables'>
								<article className='firstTable'>
									<div className='tableTitle'>
										<h2>Sózler sáne boyınsha</h2>
										<button onClick={showModalAddWord}>Add word</button>
										<AddWord
											isModalAddWordOpen={isModalAddWordOpen}
											setIsModalAddWordOpen={setIsModalAddWordOpen}
										/>
									</div>
									<Table />
								</article>
								<article className='secondTable'>
									<div className='tableTitle'>
										<h2>Kategoriya</h2>
										<button onClick={showModalAddCategory}>Add category</button>
										<AddCategory
											setIsModalAddCategoryOpen={setIsModalAddCategoryOpen}
											isModalAddCategoryOpen={isModalAddCategoryOpen}
										/>
									</div>
									<Table2 />
								</article>
							</div>
						</section>
					</Spin>
				</main>
			</div>
		</>
	)
}

export default AdminHome
