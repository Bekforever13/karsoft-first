import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<>
			<div className='notFound'>
				<div class='gif'>
					<img
						src='https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg'
						alt='404'
					></img>
				</div>
				<div class='content'>
					<h1 class='main-heading'>This page is gone.</h1>
					<p>
						...maybe the page you're looking for is not found or never existed.
					</p>
					<Link to='/'>
						<button className='homeBtn'>
							Back to home <i class='far fa-hand-point-right'></i>
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default NotFound
