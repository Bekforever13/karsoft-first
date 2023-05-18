import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '../../App'
import SearchResult from '../SearchResult/SearchResult'
import './Header.scss'
import a from '../../assets/img/A.svg'
import b from '../../assets/img/B.svg'
import c from '../../assets/img/C.svg'
import w from '../../assets/img/W.svg'
import Lugat from '../../assets/img/Lugat.svg'
import Sozlar from '../../assets/img/Sozlar.svg'
import circle from '../../assets/img/circle.svg'
import circle1 from '../../assets/img/circle1.svg'
import logo from '../../assets/img/logo.svg'

const Header = () => {
	const [searchValue, setSearchValue] = useState('')
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)

	return (
		<header className='header'>
			<div className='header-wrapper'>
				<div className='container'>
					<div className='logo-nav'>
						<div className='logo'>
							<Link to='/'>
								<img width={35} height={35} src={logo} alt='' />
							</Link>
						</div>
						<nav>
							<NavLink
								className={navData => (navData.isActive ? 'active' : 'link')}
								to='/'
							>
								{lang ? 'Sózler' : 'Сөзлер'}
							</NavLink>
							<NavLink
								className={navData => (navData.isActive ? 'active' : 'link')}
								to='/words'
							>
								{lang ? 'Sózler dizimi' : 'Сөзлер дизими'}
							</NavLink>
							<NavLink
								className={navData => (navData.isActive ? 'active' : 'link')}
								to='/about'
							>
								{lang ? 'Baǵdarlama haqqinda' : 'Бағдарлама ҳаққында'}
							</NavLink>
							<div className='langIcon' onClick={() => setLang(!lang)}>
								{lang ? 'Qq' : 'Ққ'}
							</div>
						</nav>
					</div>
				</div>
			</div>
			<div className='search-wrapper'>
				<div className='search'>
					<h3>
						{lang
							? 'Bir sózdi izleń, onı úyreniń'
							: 'Бир сөзди излең, оны үйрениң'}
					</h3>
					<div className='circle-bg'>
						<img className='circle-img' src={circle} alt='circle' />
						<img className='circle-img2' src={circle1} alt='circle' />
						<input
							type='text'
							onChange={e => setSearchValue(e.target.value)}
							placeholder={
								lang
									? 'sózdi izlew ushın jazıń...'
									: 'сөзди излеў ушын жазың...'
							}
						/>
						<button>
							<box-icon name='search'></box-icon>
						</button>
					</div>
				</div>
				<div className='bg-words'>
					<img className='img-a' src={a} alt='a' />
					<img className='img-b' src={b} alt='b' />
					<img className='img-c' src={c} alt='c' />
					<img className='img-w' src={w} alt='w' />
					<img className='img-lugat' src={Lugat} alt='lugat' />
					<img className='img-sozlar' src={Sozlar} alt='sozlar' />
				</div>
			</div>
			<div className='container'>
				{searchValue ? <SearchResult searchValue={searchValue} /> : null}
			</div>
		</header>
	)
}

export default Header
