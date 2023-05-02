import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import './SozlerDizimi.scss'
import { axiosClassic } from '../../api/axios'

const SozlerDizimi = () => {
	const [allWordsArray, setAllWordsArray] = useState([])
	// const [currentPage, setCurrentPage] = useState(1)
	// const PageNumbers = []
	// const [wordsPerPage] = useState(30)
	// const indexOfLastWord = currentPage * wordsPerPage
	// const indexOfFirstWord = indexOfLastWord - wordsPerPage
	// const currentWords = allWordsArray.slice(indexOfFirstWord, indexOfLastWord)

	// for (let i = 1; i <= Math.ceil(allWordsArray / wordsPerPage); i++) {
	// 	PageNumbers.push(i)
	// }

	useEffect(() => {
		axiosClassic
			.get('/api/words?limit=500&')
			.then(res => setAllWordsArray(res.data.data))
	}, [])

	return (
		<div className='sozler-dizimi'>
			<h3>Sozler Dizimi</h3>
			<ul className='list'>
				{allWordsArray.map(word => {
					return <li className='listItem'>{word.latin}</li>
				})}
				{/* {allWordsArray.map(word => {
					return <li className='listItem'>{word.latin}</li>
				})} */}
			</ul>
			<Pagination
				defaultCurrent={1}
				pageSize={30}
				total={500}
				// onChange={onChangePage}
				itemRender={() => allWordsArray}
				defaultPageSize={20}
			/>
			;
		</div>
	)
}

export default SozlerDizimi
