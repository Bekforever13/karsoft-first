import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '../../App'
import SearchResult from '../SearchResult/SearchResult'
import './Header.scss'

const Header = () => {
	const [searchValue, setSearchValue] = useState('')
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)

	return (
		<header>
			<div className='header-wrapper'>
				<div className='container'>
					<div className='logo-nav'>
						<div className='logo'>
							<Link to='/'>
								<img
									width={35}
									height={35}
									src='../../../public/img/logo.svg'
									alt=''
								/>
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
						<img
							className='circle-img'
							src='../../../public/img/circle.svg'
							alt='circle'
						/>
						<img
							className='circle-img2'
							src='../../../public/img/circle1.svg'
							alt='circle'
						/>
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
					<img className='img-a' src='../../../public/img/a.svg' alt='a' />
					<img className='img-b' src='../../../public/img/b.svg' alt='b' />
					<img className='img-c' src='../../../public/img/c.svg' alt='c' />
					<img className='img-w' src='../../../public/img/w.svg' alt='w' />
					<img
						className='img-lugat'
						src='../../../public/img/lugat.svg'
						alt='lugat'
					/>
					<img
						className='img-sozlar'
						src='../../../public/img/sozlar.svg'
						alt='sozlar'
					/>
				</div>
			</div>
			<div className='container'>
				{searchValue ? <SearchResult searchValue={searchValue} /> : null}
			</div>
		</header>
	)
}

export default Header
