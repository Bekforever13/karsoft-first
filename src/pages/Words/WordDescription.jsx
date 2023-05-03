import React, { useEffect, useState } from 'react'
import { axiosClassic } from '../../api/axios'
import Alphabet from '../../components/Alphabet'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useParams, Link } from 'react-router-dom'
import './WordDescription.scss'

const WordDescription = id => {
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
			setCurrentWord({
				id: res.data.data.id,
				latinText: res.data.data.latin,
				kirilText: res.data.data.kiril,
				latinDesc: res.data.data.description_latin,
				kirilDesc: res.data.data.description_kiril,
				latinCategory: res.data.data.categories.map(el => (el ? el.latin : '')),
				kirilCategory: res.data.data.categories.kiril,
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
					<span className='soz'>SÓZ MÁNISI</span>
					<div className='share cursor-pointer'>
						<box-icon name='share-alt'></box-icon>
						<span>Share</span>
					</div>
				</div>
				<h2>
					<span>{currentWord.latinText}</span>
				</h2>
				<span className='typeOfWord'>{currentWord.latinCategory}</span>
				<p>{currentWord.latinDesc}</p>
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
									<Link to={`/words/${word.id}`}>{word.latin}</Link>
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
									<Link to={`/words/${word.id}`}>{word.latin}</Link>
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
