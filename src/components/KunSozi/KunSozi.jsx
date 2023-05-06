import React, { useContext, useEffect, useState } from 'react'
import 'boxicons'
import './KunSozi.scss'
import { axiosClassic } from '../../api/axios'
import { Context } from '../../App'

const KunSozi = () => {
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)
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
		axiosClassic.get('/api/wordsday').then(res => {
			setWordsDay({
				id: res.data.data.id,
				latinText: res.data.data.latin,
				kirilText: res.data.data.kiril,
				latinDesc: res.data.data.description_latin,
				kirilDesc: res.data.data.description_kiril,
				latinCategory: res.data.data.categories.latin,
				kirilCategory: res.data.data.categories.kiril,
			})
		})
	}, [])

	return (
		<div className='kun-sozi'>
			<div>
				<span className='soz'>{lang ? 'KÚN SÓZI' : 'КҮН СӨЗИ'}</span>
				<div className='share cursor-pointer'>
					<box-icon name='share-alt'></box-icon>
					<span>Share</span>
				</div>
			</div>
			<h2>
				<span>{lang ? wordsDay.latinText : wordsDay.kirilText}</span>
				{/* <box-icon name='volume-full'></box-icon> */}
			</h2>
			<span className='typeOfWord'>
				{lang ? wordsDay.latinCategory : wordsDay.kirilCategory}
			</span>
			<p>{lang ? wordsDay.latinDesc : wordsDay.kirilDesc}</p>
		</div>
	)
}

export default KunSozi
