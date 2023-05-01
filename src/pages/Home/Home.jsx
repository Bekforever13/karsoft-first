import React, { useState } from 'react'
import 'boxicons'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import KunSozi from '../../components/KunSozi/KunSozi'
import FrameDesc from '../../components/FrameDesc'
import Alphabet from '../../components/Alphabet'
import './Home.scss'

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
				<div className='container'>
					<div className='first'>
						<img
							className='bg-a-big'
							src='../../../public/img/A-big.svg'
							alt=''
						/>
						<img
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
				</div>
				<Alphabet />
			</main>
			<Footer />
		</>
	)
}

export default Home
