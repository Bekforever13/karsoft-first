import React from 'react'
import 'boxicons'
import FrameDesc from './FrameDesc'
import KunSozi from './KunSozi'
import SozlerDizimi from './SozlerDizimi'

const MainFirstSection = () => {
	return (
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
			{/* <SozlerDizimi /> */}
			{/* <KunSozi />
			<FrameDesc /> */}
		</div>
	)
}

export default MainFirstSection
