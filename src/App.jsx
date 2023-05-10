import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Words from './pages/Words/Words'
import About from './pages/About/About'
import NotFound from './pages/NotFound'
import Login from './pages/AuthForm/Login/Login'
import AdminHome from './pages/AuthForm/Admin/AdminHome/AdminHome'
import AdminWord from './pages/AuthForm/Admin/AdminWord/AdminWord'
import AdminCategory from './pages/AuthForm/Admin/AdminCategory/AdminCategory'
import Admins from './pages/AuthForm/Admin/Admins/Admins'
import { createContext, useState, useEffect } from 'react'
import { axiosClassic } from './api/axios'
import SearchResult from './components/SearchResult/SearchResult'
import WordDescription from './pages/Words/WordDescription'
import Copywriter from './pages/Copywriter/Copywriter'
import Tester from './pages/Tester/Tester'

export const Context = createContext()

function App() {
	const [allWordsArray, setAllWordsArray] = useState([])
	const [page, setPage] = useState(1)
	const [lang, setLang] = useState(true)
	const [totalCategory, setTotalCategory] = useState(0)
	const [allCategory, setAllCategory] = useState([])

	useEffect(() => {
		axiosClassic
			.get(`/api/search?page=${page}&limit=30`)
			.then(res => setAllWordsArray(res.data.data))
	}, [page])

	//all category
	useEffect(() => {
		axiosClassic
			.get(`/api/categories`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				setTotalCategory(res.data.data.length)
				setAllCategory(res.data.data)
			})
	}, [])
	return (
		<Context.Provider
			value={[
				allWordsArray,
				page,
				setPage,
				lang,
				setLang,
				totalCategory,
				allCategory,
			]}
		>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/words' element={<Words />} />
				<Route path='/words/:id' element={<WordDescription />} />
				<Route path='/about' element={<About />} />
				<Route path='/searchresult' element={<SearchResult />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/login' element={<Login />} />
				<Route path='/admin' element={<AdminHome />} />
				<Route path='/admin/words' element={<AdminWord />} />
				<Route path='/admin/category' element={<AdminCategory />} />
				<Route path='/admin/admins' element={<Admins />} />
				<Route path='/copywriter' element={<Copywriter />} />
				<Route path='/tester' element={<Tester />} />
			</Routes>
		</Context.Provider>
	)
}

export default App
