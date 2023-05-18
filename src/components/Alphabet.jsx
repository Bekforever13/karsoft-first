import React, { useContext } from 'react'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import bDark from '../../assets/img/B-dark.svg'
import c1Dark from '../../assets/img/C-dark.svg'
import c2Dark from '../../assets/img/C-dark.svg'
import aDark from '../../assets/img/A-dark.svg'

export const kirilAlphabet = [
	'А',
	'Ә',
	'Б',
	'В',
	'Г',
	'Ғ',
	'Д',
	'Е',
	'Ё',
	'Ж',
	'З',
	'И',
	'Й',
	'К',
	'Қ',
	'Л',
	'М',
	'Н',
	'Ң',
	'О',
	'Ө',
	'П',
	'Р',
	'С',
	'Т',
	'У',
	'Ү',
	'Ў',
	'Ф',
	'Х',
	'Ҳ',
	'Ц',
	'Ч',
	'Ш',
	'Щ',
	'Ы',
	'Э',
	'Ю',
	'Я',
]
export const latinAlphabet = [
	'A',
	'Á',
	'B',
	'D',
	'E',
	'F',
	'G',
	'Ǵ',
	'H',
	'X',
	'Í',
	'I',
	'J',
	'K',
	'Q',
	'L',
	'M',
	'N',
	'Ń',
	'O',
	'Ó',
	'P',
	'R',
	'S',
	'T',
	'U',
	'Ú',
	'V',
	'W',
	'Y',
	'Z',
	'Sh',
	'C',
	'Ch',
]

const Alphabet = () => {
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)
	const waqtinshaArray = [
		'ABADANLASÍW',
		'BAǴ',
		'ABADAN',
		'DABÍL',
		'ABAYLAW',
		'ABÍSÍN-AJÍN',
		'ABAQ',
		'ABAY',
		'ABAJUR',
		'ADAM',
		'ABADANLÍQ',
		'ABAY-SIYASAT',
	]

	return (
		<div className='second'>
			<div className='container'>
				<div className='sozler'>
					<h3>
						{lang
							? 'Kópshilikke arnalǵan izlewler'
							: 'Көпшиликке арналған излеўлер'}
					</h3>
					<p>
						{lang
							? 'Qaraqalpaq tiliniń túsindirme sózligi'
							: 'Қарақалпақ тилиниң түсиндирме сөзлиги'}
					</p>
					<div className='soz'>
						{waqtinshaArray.map((soz, index) => {
							return (
								<a key={index} href='#'>
									{soz}
								</a>
							)
						})}
					</div>
				</div>
				<div className='alphabet'>
					<ul className='alphabet__list'>
						{lang
							? latinAlphabet.map((item, i) => {
									return (
										<li className='alphabet__item' key={i}>
											<Link to={'#'}>
												{item}
												{item.toLowerCase()}
											</Link>
										</li>
									)
							  })
							: kirilAlphabet.map((item, i) => {
									return (
										<li className='alphabet__item' key={i}>
											<Link to={'#'}>
												{item}
												{item.toLowerCase()}
											</Link>
										</li>
									)
							  })}
					</ul>
				</div>
			</div>
			<div className='bg-img'>
				<img className='bg-img-b-dark' src={bDark} alt='' />
				<img className='bg-img-c1-dark' src={c1Dark} alt='' />
				<img className='bg-img-c2-dark' src={c2Dark} alt='' />
				<img className='bg-img-a-dark' src={aDark} alt='' />
				<span className='bg-img-a-big'>A</span>
			</div>
		</div>
	)
}

export default Alphabet
