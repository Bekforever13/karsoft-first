import React, { useState } from 'react'
import KunSozi from '../../components/KunSozi/KunSozi'

const WordDescription = () => {
	const [kunSozi, setKunSozi] = useState({
		title: 'KÚN SÓZI',
		word: 'AVANS',
		description: `Islegen is haqısınıń ushınan alıw, tolıq emes, belgili muǵdarı,
				raschettan burınıraq alatuǵın aqsha. Al avanstı az alsań, tabelshikke
				ókpelep keledi (B.Ismaylov). Avans aqshasın alarda tayar, Bunday
				jalqawlarǵa zat bermew kerek (S.Nurımbetov)`,
		typeOfWord: 'Atliq',
	})
	return (
		<div>
			<KunSozi
				title={kunSozi.title}
				word={kunSozi.word}
				description={kunSozi.description}
				typeOfWord={kunSozi.typeOfWord}
			/>
		</div>
	)
}

export default WordDescription
