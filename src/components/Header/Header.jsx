import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
	return (
		<header>
			<div className='header-wrapper'>
				{/* LOGO */}
				<div className='logo'>
					<Link to='/'>
						<img
							width={48}
							height={48}
							src='../../../public/img/logo.svg'
							alt=''
						/>
					</Link>
				</div>
				{/* nav */}
				<nav>
					<Link to='/'>Sózler</Link>
					<Link to='/words'>Sózler dizimi</Link>
					<Link to='/about'>Baǵdarlama haqqinda</Link>
				</nav>
			</div>
			{/* search  */}
			<div className='search-wrapper'>
				<div className='search'>
					<h3>Bir sózdi izleń, onı úyreniń</h3>
					<div>
						<input type='text' placeholder="Sózdi izlew ushin jazin'" />
						<button>
							<box-icon name='search'></box-icon>
						</button>
					</div>
				</div>
				<div>
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
		</header>
	)
}

export default Header
