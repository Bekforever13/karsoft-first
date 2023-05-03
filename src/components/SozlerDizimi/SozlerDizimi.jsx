import { Pagination } from 'antd'
import React, { useContext } from 'react'
import './SozlerDizimi.scss'
import { Context } from '../../App'

const SozlerDizimi = () => {
	const [allWordsArray, setAllWordsArray] = useContext(Context)

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
				total={500}
				defaultPageSize={20}
			/>
		</div>
	)
}

export default SozlerDizimi
