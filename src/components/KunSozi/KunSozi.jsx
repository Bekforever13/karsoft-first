import React, { useEffect, useState } from 'react'
import 'boxicons'
import './KunSozi.scss'
import { axiosClassic } from '../../api/axios'

const KunSozi = () => {
	const [wordsDay, setWordsDay] = useState({
		id: null,
		latinText: '',
		kirilText: '',
		latinDesc: '',
		kirilDesc: '',
		latinCategory: '',
		kirilCategory: '',
	})
	useEffect(() => {
		axiosClassic.get('/api/words?limit=500&').then(res => console.log(res))
	}, [])
	// all words api naverxu

	// axiosClassic.get('/api/wordsday').then(res => {
	// 	setWordsDay({
	// 		id: res.data.data.id,
	// 		latinText: res.data.data.latin,
	// 		kirilText: res.data.data.kiril,
	// 		latinDesc: res.data.data.description_latin,
	// 		kirilDesc: res.data.data.description_kiril,
	// 		latinCategory: res.data.data.categories.latin,
	// 		kirilCategory: res.data.data.categories.kiril,
	// 	})
	// })
	return (
		<div className='kun-sozi'>
			<div>
				<span className='soz'>{'KÚN SÓZI'}</span>
				<div className='share cursor-pointer'>
					<box-icon name='share-alt'></box-icon>
					<span>Share</span>
				</div>
			</div>
			<h2>
				<span>{wordsDay.latinText}</span>
				{/* <box-icon name='volume-full'></box-icon> */}
			</h2>
			<span className='typeOfWord'>{wordsDay.latinCategory}</span>
			<p>{wordsDay.latinDesc}</p>
		</div>
	)
}

export default KunSozi
