import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../App'
import './SearchResult.scss'

const SearchResult = ({ searchValue }) => {
	const [allWordsArray, setAllWordsArray] = useContext(Context)

	return (
		<>
			<ul className='resultOfSearch'>
				{searchValue
					? allWordsArray
							.filter(i =>
								i.latin.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map(res => {
								return <li key={res.id}>{res.latin}</li>
							})
					: ''}
			</ul>
		</>
	)
}

export default SearchResult
