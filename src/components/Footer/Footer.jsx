import 'boxicons'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../App'
import googlePlayImg from '../../assets/img/google-play.png'
import './Footer.scss'

const Footer = () => {
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)

	return (
		<footer>
			<div className='container'>
				<div className='footer-wrapper'>
					<div className='footer-logo-sm'>
						<div className='footer-logo'>
							<img width={48} height={48} src='/img/logo.svg' alt='' />
						</div>
						<div className='footer-social-media'>
							<h4>
								{lang ? 'Sociallıq tarmaqlar :' : 'Социаллық тармақлар :'}
							</h4>
							<div className='sm'>
								<a href='#'>
									<i className='bx bxl-youtube'></i>
								</a>
								<a href='#'>
									<i className='bx bxl-telegram'></i>
								</a>
								<a href='#'>
									<i className='bx bxl-instagram'></i>
								</a>
							</div>
						</div>
					</div>
					<div className='footer-about'>
						<h3>{lang ? 'Baǵdarlama haqqında' : 'Бағдарлама ҳаққында'}</h3>
						<div className='footer-nav'>
							<a href='#'>{lang ? 'Kún sózi' : 'Күн сөзи'}</a>
							<a href='#'>{lang ? 'Jańa sózler' : 'Жаңа сөзлер'}</a>
							<a href='#'>{lang ? 'Sózler dizimi' : 'Сөзлер дизими'}</a>
						</div>
					</div>
					<div className='footer-mobile-app'>
						<h3>{lang ? 'Android' : 'Андроид'}</h3>
						<div>
							<h4>
								{lang
									? 'Android baǵdarlamasın júklep alıń hám offlayn tárizde paydalanıń.'
									: 'Андроид бағдарламасын жүклеп алың ҳәм оффлайн тәризде пайдаланың.'}
							</h4>
							<a
								href='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik'
								target={'_blank'}
							>
								<img src={googlePlayImg} alt='' />
							</a>
							<Link to={'/login'}>Login</Link>
						</div>
					</div>
				</div>
				<div className='copyrite'>
					Avtorlıq huqıqı © 2022 Bookie audiokitaplar, "KARSOFT-IT-SOLUTIONS"
					JSHJ • Barlıq huqıqlar qorǵalǵan.
				</div>
			</div>
		</footer>
	)
}

export default Footer
