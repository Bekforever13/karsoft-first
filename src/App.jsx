import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Words from './pages/Words/Words'
import About from './pages/About/About'
import NotFound from './pages/NotFound'
import Login from './pages/AuthForm/Login/Login'
import Register from './pages/AuthForm/Register/Register'
import AdminHome from './pages/AuthForm/Admin/AdminHome/AdminHome'
import { createContext, useState, useEffect } from 'react'
import { axiosClassic } from './api/axios'
import SearchResult from './components/SearchResult/SearchResult'
import WordDescription from './pages/Words/WordDescription'

export const Context = createContext()

function App() {
	const [allWordsArray, setAllWordsArray] = useState([])
	const [page, setPage] = useState(1)

	useEffect(() => {
		axiosClassic
			.get(`/api/search?page=${page}&limit=30`)
			.then(res => setAllWordsArray(res.data.data))
	}, [page])

	return (
		<Context.Provider value={[allWordsArray, page, setPage]}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/words' element={<Words />} />
				<Route path='/words/:id' element={<WordDescription />} />
				<Route path='/about' element={<About />} />
				<Route path='/searchresult' element={<SearchResult />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/admin' element={<AdminHome />} />
			</Routes>
		</Context.Provider>
	)
}

export default App
