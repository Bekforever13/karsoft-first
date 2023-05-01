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
						<KunSozi />
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
