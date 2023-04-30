import React, { useState } from 'react'
import 'boxicons'
import './Home.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import KunSozi from '../../components/KunSozi/KunSozi'
import FrameDesc from '../../components/FrameDesc'
import Alphabet from '../../components/Alphabet'

const Home = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
	const [kunSozi, setKunSozi] = useState({
		title: 'KÚN SÓZI',
		word: 'AVANS',
		description: `Islegen is haqısınıń ushınan alıw, tolıq emes, belgili muǵdarı,
				raschettan burınıraq alatuǵın aqsha. Al avanstı az alsań, tabelshikke
				ókpelep keledi (B.Ismaylov). Avans aqshasın alarda tayar, Bunday
				jalqawlarǵa zat bermew kerek (S.Nurımbetov)`,
	})

	return (
		<>
			<Header />
			<main>
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
					<KunSozi
						title={kunSozi.title}
						word={kunSozi.word}
						description={kunSozi.description}
					/>
					<FrameDesc />
				</div>
				<Alphabet />
			</main>
			<Footer />
		</>
	)
}

export default Home
