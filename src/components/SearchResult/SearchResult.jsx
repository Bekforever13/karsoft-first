import React, { useContext, useEffect, useState } from 'react'
import { axiosClassic } from '../../api/axios'
import { Context } from '../../App'
import './SearchResult.scss'
import { Link } from 'react-router-dom'

const SearchResult = ({ searchValue }) => {
	const [allWordsArray, setAllWordsArray] = useContext(Context)
	const [searchWords, setSearchWords] = useState([])

	useEffect(() => {
		axiosClassic
			.get(`/api/search?limit=500`)
			.then(res => {
				setSearchWords(res.data.data)
			})
			.catch(err => console.log(err))
	}, [searchValue])

	return (
		<>
			<ul className='resultOfSearch'>
				{searchValue
					? searchWords
							.filter(i => i.toLowerCase().includes(searchValue.toLowerCase()))
							.map(res => {
								return (
									<li key={res.id}>
										<Link to={`/words/${res.id}`}>{res.latin}</Link>
									</li>
								)
							})
					: ''}
			</ul>
		</>
	)
}

export default SearchResult
