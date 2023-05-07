import { Pagination } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import './SozlerDizimi.scss'
import { Context } from '../../App'
import { axiosClassic } from '../../api/axios'
import { Link } from 'react-router-dom'

const SozlerDizimi = () => {
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)
	const [totalWords, setTotalWords] = useState(0)

	useEffect(() => {
		axiosClassic
			.get(`/api/words?limit=500&`)
			.then(res => {
				setTotalWords(res.data.total)
			})
			.catch(err => console.log(err))
	}, [page])

	return (
		<div className='sozler-dizimi'>
			<h3>{lang ? 'Sozler Dizimi' : 'Сөзлер дизими'}</h3>
			<ul className='list'>
				{lang
					? allWordsArray.map(word => {
							return (
								<li key={word.id} className='listItem'>
									<Link to={`/words/${word.id}`}>{word.latin}</Link>
								</li>
							)
					  })
					: allWordsArray.map(word => {
							return (
								<li key={word.id} className='listItem'>
									<Link to={`/words/${word.id}`}>{word.kiril}</Link>
								</li>
							)
					  })}
			</ul>
			<Pagination
				defaultCurrent={page}
				pageSize={30}
				total={totalWords}
				defaultPageSize={20}
				onChange={e => setPage(e)}
			/>
		</div>
	)
}

export default SozlerDizimi
