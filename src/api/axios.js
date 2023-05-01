import axios from 'axios'

export const axiosClassic = axios.create({
	baseURL: 'http://sozlik.abbc.uz',
})

export const axiosAPI = axios.create({
	baseURL: 'http://sozlik.abbc.uz',
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	},
})
