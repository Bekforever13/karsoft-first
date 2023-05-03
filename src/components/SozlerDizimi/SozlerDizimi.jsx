import { Pagination } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import './SozlerDizimi.scss'
import { Context } from '../../App'
import { axiosClassic } from '../../api/axios'

const SozlerDizimi = () => {
	const [allWordsArray, page, setPage] = useContext(Context)
	const [totalWords, setTotalWords] = useState(0)

	useEffect(() => {
		axiosClassic
			.get(`/api/words?limit=500&`)
			.then(res => {
				setTotalWords(res.data.data.length)
				console.log(totalWords)
			})
			.catch(err => console.log(err))
	}, [page])

	return (
		<div className='sozler-dizimi'>
			<h3>Sozler Dizimi</h3>
			<ul className='list'>
				{allWordsArray.map(word => {
					return (
						<li key={word.id} className='listItem'>
							{word.latin}
						</li>
					)
				})}
			</ul>
			<Pagination
				defaultCurrent={1}
				pageSize={30}
				total={324}
				defaultPageSize={20}
				onChange={e => setPage(e)}
			/>
		</div>
	)
}

export default SozlerDizimi
