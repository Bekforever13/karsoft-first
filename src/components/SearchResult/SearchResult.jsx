import React, { useContext } from 'react'
import { Context } from '../../App'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './SearchResult.scss'

const SearchResult = ({ searchValue }) => {
	const [allWordsArray, setAllWordsArray] = useContext(Context)
	// const res = allWordsArray.filter(i =>
	// 	i.latin.toLowerCase().includes(props.searchValue.toLowerCase())
	// )
	console.log(searchValue)
	return (
		<>
			<Header />
			<div className='container'>
				<div className='search-result-wrapper'>
					<h1>Uqsas sózler</h1>
					<ul className='searchResults'>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
						<li>word</li>
					</ul>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default SearchResult
