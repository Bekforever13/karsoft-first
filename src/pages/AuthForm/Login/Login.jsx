import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClassic } from '../../../api/axios'
import { Context } from '../../../App'
import './Login.scss'

const Login = () => {
	const [currentUser, setCurrentUser] = useState({
		phone: null,
		password: '',
	})

	const navigate = useNavigate()

	// check
	useEffect(() => {
		if (localStorage.getItem('token')) {
			axiosClassic
				.get('/api/check', {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then(res => {
					if (res.data.data.user.role === 'admin') {
						navigate('/admin', { replace: true })
					} else if (res.data.data.user.role === 'copywriter') {
						navigate('/copywriter', { replace: true })
					} else if (res.data.data.user.role === 'tester') {
						navigate('/tester', { replace: true })
					}
				})
				.catch(err => console.log(err))
		}
	}, [])

	// login
	const login = e => {
		e.preventDefault()
		axiosClassic
			.post('/api/authenticate', currentUser)
			.then(res => {
				localStorage.setItem('token', 'Bearer ' + res.data.data.token)
				if (res.data.data.user.role === 'admin') {
					navigate('/admin', { replace: true })
				} else if (res.data.data.user.role === 'copywriter') {
					navigate('/copywriter', { replace: true })
				} else if (res.data.data.user.role === 'tester') {
					navigate('/tester', { replace: true })
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<div className='wrapper'>
			<form className='form' onSubmit={e => login(e)}>
				<img src='../../../public/img/logo-form.svg' alt='' />
				<div className='form__wrapper'>
					<input
						className='form__wrapper-input'
						placeholder='Phone'
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
