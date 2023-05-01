import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import './SozlerDizimi.scss'
import { axiosClassic } from '../../api/axios'

const SozlerDizimi = () => {
	const [allWordsArray, setAllWordsArray] = useState([])
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
			</ul>
			<Pagination
				defaultCurrent={1}
				pageSize={100}
				total={500}
				dataSource={allWordsArray}
			/>
			;
		</div>
	)
}

export default SozlerDizimi
