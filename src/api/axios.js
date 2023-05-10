import axios from 'axios'

export const axiosClassic = axios.create({
	baseURL: 'https://sozlik.abbc.uz',
})

export default axiosClassic
