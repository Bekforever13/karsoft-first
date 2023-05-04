import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClassic } from '../../../api/axios'
import './Login.scss'

const Login = () => {
	const [currentUser, setCurrentUser] = useState({
		phone: null,
		password: '',
	})

	const navigate = useNavigate()

	const login = e => {
		e.preventDefault()
		axiosClassic
			.post('/api/authenticate', currentUser)
			.then(res => {
				localStorage.setItem('token', 'Bearer ' + res.data.data.token)
				console.log(localStorage)
			})
			.catch(err => console.log(err))
			.finally(() => navigate('/', { replace: true }))
	}

	return (
		<div className='wrapper'>
			<form className='form' onSubmit={e => login(e)}>
				<img src='../../../public/img/logo-form.svg' alt='' />
				<div className='form__wrapper'>
					<input
						className='form__wrapper-input'
						placeholder='Login'
						type='text'
						onChange={e =>
							setCurrentUser({ ...currentUser, phone: e.target.value })
						}
					/>
					<input
						className='form__wrapper-input'
						placeholder='Password'
						type='password'
						onChange={e =>
							setCurrentUser({ ...currentUser, password: e.target.value })
						}
					/>
					<button className='form__wrapper-button'>Submit</button>
				</div>
			</form>
		</div>
	)
}

export default Login
