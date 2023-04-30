import React from 'react'
import 'boxicons'
import './KunSozi.scss'

const KunSozi = ({ title, word, description, typeOfWord }) => {
	return (
		<div className='kun-sozi'>
			<div>
				<span className='soz'>{title}</span>
				<div className='share cursor-pointer'>
					<box-icon name='share-alt'></box-icon>
					<span>Share</span>
				</div>
			</div>
			<h2>
				<span>{word}</span>
				<box-icon name='volume-full'></box-icon>
			</h2>
			<span className='typeOfWord'>{typeOfWord}</span>
			<p>{description}</p>
		</div>
	)
}

export default KunSozi
