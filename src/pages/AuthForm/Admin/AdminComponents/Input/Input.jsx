import React, { useContext, useEffect, useRef, useState } from 'react'
import './Input.scss'
import axiosClassic from '../../../../../api/axios'
import { Link } from 'react-router-dom'
import { Context } from '../../../../../App'
import Search from 'antd/es/input/Search'
import useDebounce from '../../../../../hooks/useDebounce'
import { Spin } from 'antd'
const Input = () => {
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
	const [result, setResult] = useState([])
	const resultsRef = useRef()

	const [search, setSearch] = useState('')

	const debouncedValue = useDebounce(search, 500)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		if (debouncedValue.length !== 0) {
			setLoading(true)
			axiosClassic
				.get(`/api/search?search=${debouncedValue}`, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then(res => {
					setResult(res.data.data)
				})
				.finally(() => setLoading(false))
		} else {
			setResult([])
			setSearch('')
		}
	}, [debouncedValue])

	return (
		<div className='input-wrapper'>
			<div className='inputField relative'>
				<Search
					className='search'
					placeholder='Search a word'
					allowClear
					size='large'
					onChange={e => setSearch(e.target.value)}
				/>
				{result && search ? (
					<div
						ref={resultsRef}
						className='absolute top-[50px] bg-white p-6 rounded-md shadow-lg w-full max-h-[450px] overflow-y-auto z-[9999]'
					>
						<Spin spinning={loading}>
							<ul>
								{result?.map(item => (
									<li key={item.id}>
										<Link to={`/words/${item.id}`}>{item.latin}</Link>
									</li>
								))}
							</ul>
						</Spin>
					</div>
				) : null}
			</div>
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
		</div>
	)
}

export default Input
