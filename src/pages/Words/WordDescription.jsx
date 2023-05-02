import React, { useState } from 'react'

const WordDescription = () => {
	return (
		<>
			<div className='wordInfo'>
				<div>
					<span className='soz'>SÓZ MÁNISI</span>
					<div className='share cursor-pointer'>
						<box-icon name='share-alt'></box-icon>
						<span>Share</span>
					</div>
				</div>
				<h2>
					<span>word</span>
				</h2>
				<span className='typeOfWord'>category</span>
				<p>description</p>
			</div>
		</>
	)
}

export default WordDescription
