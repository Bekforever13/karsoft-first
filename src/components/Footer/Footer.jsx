import React from 'react'
import './Footer.scss'
import 'boxicons'

const Footer = () => {
	return (
		<footer>
			<div className='container'>
				<div className='footer-wrapper'>
					<div className='footer-logo-sm'>
						<div className='footer-logo'>
							<img
								width={48}
								height={48}
								src='../../../public/img/logo.svg'
								alt=''
							/>
						</div>
						<div className='footer-social-media'>
							<h4>Sociallıq tarmaqlar :</h4>
							<div className='sm'>
								<a href='#'>
									<box-icon
										name='youtube'
										color='#ffffff'
										type='logo'
									></box-icon>
								</a>
								<a href='#'>
									<box-icon
										name='telegram'
										color='#ffffff'
										type='logo'
									></box-icon>
								</a>
								<a href='#'>
									<box-icon
										name='instagram'
										type='logo'
										color='#ffffff'
									></box-icon>
								</a>
							</div>
						</div>
					</div>
					<div className='footer-about'>
						<h3>Baǵdarlama haqqında</h3>
						<div className='footer-nav'>
							<a href='#'>Kún sózi</a>
							<a href='#'>Jańa sózler</a>
							<a href='#'>Sózler dizimi</a>
						</div>
					</div>
					<div className='footer-mobile-app'>
						<h3>Android</h3>
						<div>
							<h4>
								Android baǵdarlamasın júklep alıń hám offlayn tárizde
								paydalanıń.
							</h4>
							<a
								href='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik'
								target={'_blank'}
							>
								<img src='../../../public/img/google-play.png' alt='' />
							</a>
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
