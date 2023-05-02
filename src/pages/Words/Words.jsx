import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SozlerDizimi from '../../components/SozlerDizimi/SozlerDizimi'
import Alphabet from '../../components/Alphabet'
import WordDescription from './WordDescription'
import './Words.scss'

const Words = () => {
	window.scrollTo({ top: 500, behavior: 'smooth' })
	return (
		<div>
			<Header />
			<div className='first'>
				<img
					width={250}
					height={500}
					className='bg-a-big'
					src='../../../public/img/A-big.svg'
					alt=''
				/>
				<img
					width={250}
					height={500}
					className='bg-b-big'
					src='../../../public/img/B-big.svg'
					alt=''
				/>
				{/* <WordDescription /> */}
				<SozlerDizimi />
				<Alphabet />
			</div>
			<Footer />
		</div>
	)
}

export default Words
