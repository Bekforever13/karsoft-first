import React, { useContext, useEffect, useState } from 'react'
import { axiosClassic } from '../../api/axios'
import Alphabet from '../../components/Alphabet'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useParams, Link } from 'react-router-dom'
import './WordDescription.scss'
import { Context } from '../../App'

const WordDescription = id => {
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)
	// window.scrollTo({ top: 500, behavior: 'smooth' })
	const params = useParams()
	const [currentWord, setCurrentWord] = useState({
		id: null,
		latinText: '',
		kirilText: '',
		latinDesc: '',
		kirilDesc: '',
		latinCategory: '',
		kirilCategory: '',
		sinonim: [],
		antonim: [],
	})

	useEffect(() => {
		axiosClassic.get(`/api/words/${+params.id}`).then(res => {
			console.log(res.data.data)
			setCurrentWord({
				id: res.data.data.id,
				latinText: res.data.data.latin,
				kirilText: res.data.data.kiril,
				latinDesc: res.data.data.description_latin,
				kirilDesc: res.data.data.description_kiril,
				latinCategory: res.data.data.categories.map(el => (el ? el.latin : '')),
				kirilCategory: res.data.data.categories.map(el => (el ? el.kiril : '')),
				sinonim: res.data.data.synonyms,
				antonim: res.data.data.antonyms,
			})
		})
	}, [])

	return (
		<>
			<Header />
			<div className='wordInfo'>
				<div>
					<span className='soz'>{lang ? 'SÓZ MÁNISI' : 'СӨЗ МӘНИСИ'}</span>
					<div className='share cursor-pointer'>
						<box-icon name='share-alt'></box-icon>
						<span>Share</span>
					</div>
				</div>
				<h2>
					<span>{lang ? currentWord.latinText : currentWord.kirilText}</span>
				</h2>
				<span className='typeOfWord'>
					{lang ? currentWord.latinCategory : currentWord.kirilCategory}
				</span>
				<p>{lang ? currentWord.latinDesc : currentWord.kirilDesc}</p>
			</div>
			<div className='container'>
				<div className='wrapper-word'>
					{() => {
						if (currentWord.sinonim) {
							return <h2 className='h2'>Sinonim</h2>
						}
					}}
					<ul className='sinonim'>
						{currentWord.sinonim.map(word => {
							return (
								<li key={word.id} className='Item'>
									<Link to={`/words/${word.id}`}>
										{lang ? word.latin : word.kiril}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				<div className='wrapper-word'>
					{() => {
						if (currentWord.sinonim) {
							return <h2 className='h2'>Antonim</h2>
						}
					}}
					<ul className='antonim'>
						{currentWord.antonim.map(word => {
							return (
								<li key={word.id} className='Item'>
									<Link to={`/words/${word.id}`}>
										{lang ? word.latin : word.kiril}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
			<Alphabet />
			<Footer />
		</>
	)
}

export default WordDescription
