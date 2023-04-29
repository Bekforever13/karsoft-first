import React from 'react'
import 'boxicons'

const KunSozi = () => {
	return (
		<div className='kun-sozi'>
			<div>
				<span className='soz'>KÚN SÓZI</span>
				<div className='share cursor-pointer'>
					<box-icon name='share-alt'></box-icon>
					<span>Share</span>
				</div>
			</div>
			<h2>
				<span>AVANS</span>
				<box-icon name='volume-full'></box-icon>
			</h2>
			<p>
				Islegen is haqısınıń ushınan alıw, tolıq emes, belgili muǵdarı,
				raschettan burınıraq alatuǵın aqsha. Al avanstı az alsań, tabelshikke
				ókpelep keledi (B. Ismaylov). Avans aqshasın alarda tayar, Bunday
				jalqawlarǵa zat bermew kerek (S. Nurımbetov).
			</p>
		</div>
	)
}

export default KunSozi
