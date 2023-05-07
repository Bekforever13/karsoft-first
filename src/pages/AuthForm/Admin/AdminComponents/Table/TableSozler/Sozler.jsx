import React from 'react'

const Sozler = () => {
	return (
		<div className='AdmHome'>
			<Aside />
			<main>
				<Input />
				<section className='section'>
					<div className='tables'>
						<article className='sozlerTable'>
							<div className='tableTitle'>
								<h2>Sózler</h2>
								<button>Add word</button>
							</div>
							<TableSozler />
						</article>
					</div>
				</section>
			</main>
		</div>
	)
}

export default Sozler
