import React from 'react'
import './Aside.scss'

const Aside = () => {
	return (
		<aside>
			<div className='img'>
				<img src='../../../../public/img/logo.svg' alt='' />
			</div>
			<ul>
				<li>
					<span>
						<i class='bx bxs-home'></i>
					</span>{' '}
					Home
				</li>
				<li>
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
							/>
						</svg>
					</span>
					<span className='sozlerAdm'>Sózler</span>
				</li>
				<li>
					<span>
						<i class='bx bxs-category'></i>
					</span>{' '}
					Kategoriya
				</li>
				<li>
					<span>
						<i class='bx bx-log-out'></i>
					</span>{' '}
					Logout
				</li>
			</ul>
		</aside>
	)
}

export default Aside
