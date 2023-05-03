import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '../../App'
import './Header.scss'

const Header = () => {
	const [allWordsArray, setAllWordsArray] = useContext(Context)
	const [searchValue, setSearchValue] = useState('')

	const listener = useEffect(() => {}, [searchValue])

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
								Sózler
							</NavLink>
							<NavLink
								className={navData => (navData.isActive ? 'active' : 'link')}
								to='/words'
							>
								Sózler dizimi
							</NavLink>
							<NavLink
								className={navData => (navData.isActive ? 'active' : 'link')}
								to='/about'
							>
								Baǵdarlama haqqinda
							</NavLink>
						</nav>
					</div>
				</div>
			</div>
			<div className='search-wrapper'>
				<div className='search'>
					<h3>Bir sózdi izleń, onı úyreniń</h3>
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
							placeholder="Sózdi jazip baslan'"
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
				{/* <ul className='resultOfSearch'>
					{searchValue
						? allWordsArray
								.filter(i =>
									i.latin.toLowerCase().includes(searchValue.toLowerCase())
								)
								.map(res => {
									return <li key={res.id}>{res.latin}</li>
								})
						: ''}
				</ul> */}
			</div>
		</header>
	)
}

export default Header
