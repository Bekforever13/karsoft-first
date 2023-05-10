import React, { useEffect, useState } from 'react'
import './Input.scss'
import axiosClassic from '../../../../../api/axios'
import { Link } from 'react-router-dom'

const Input = () => {
	const [search, setSearch] = useState(undefined)
	const [result, setResult] = useState([])

	const inputSearch = value => {
		axiosClassic
			.get(`/api/search?search=${value}`, search, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => setResult(res.data.data))
	}

	return (
		<div className='inputField'>
			<div className='input'>
				<input
					onChange={e => {
						setSearch(e.target.value)
						inputSearch(e.target.value)
					}}
					type='text'
				/>
				<button>
					<i className='bx bx-search'></i>
				</button>
			</div>
			{search ? (
				<div className='results'>
					<ul>
						{search
							? result
									.filter(i =>
										i.latin.toLowerCase().includes(search.toLowerCase())
									)
									.map((i, index) => {
										return (
											<li key={index}>
												<Link to={`/words/${i.id}`}>{i.latin}</Link>
											</li>
										)
									})
							: ''}
					</ul>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default Input
