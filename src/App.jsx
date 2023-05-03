import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Words from './pages/Words/Words'
import About from './pages/About/About'
import NotFound from './pages/NotFound'
import { createContext, useContext, useState, useEffect } from 'react'
import { axiosClassic } from './api/axios'
import SearchResult from './components/SearchResult/SearchResult'

export const Context = createContext()

function App() {
	const [allWordsArray, setAllWordsArray] = useState([])

	useEffect(() => {
		axiosClassic
			.get('/api/words?limit=500&')
			.then(res => setAllWordsArray(res.data.data))
	}, [])

	return (
		<Context.Provider value={[allWordsArray, setAllWordsArray]}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/words' element={<Words />} />
				<Route path='/about' element={<About />} />
				<Route path='/searchresult' element={<SearchResult />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Context.Provider>
	)
}

export default App
