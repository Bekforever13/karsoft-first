import axios from 'axios'

export const axiosClassic = axios.create({
	baseURL: 'http://sozlik.abbc.uz',
})

export default axiosClassic
