import React from 'react'
import { Pagination } from 'antd'
import { Link } from 'react-router-dom'

const Tester = () => {
	return (
		<>
			<header className='copywriter-header'>
				<div className='header-logo'>
					<Link to={'/copywriter'}>
						<img src='../../../public/img/logo.svg' alt='' />
					</Link>
				</div>
				<div className='nav'>
					<Link>Отклонено</Link>
					<Link>Ожидает</Link>
					<Link>Проверено</Link>
				</div>
			</header>
			<div className='table-wrapper'>
				<table className='testerTable'>
					<thead>
						<tr>
							<th>Latin</th>
							<th>Kiril</th>
							<th>Description latin</th>
							<th>Description kiril</th>
							<th>Category</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>lorem</td>
							<td>лорем</td>
							<td>Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet</td>
							<td>Лорем ипсум долор сит амет.</td>
							<td>Atliq</td>
							<td>на проверке</td>
							<td className='actions'>
								<div className='btns-wrapper'>
									<button className='editBtn'>
										<i className='bx bx-pencil'></i>
									</button>
									<button
										className='deleteBtn'
										onClick={() => deleteItem(data.id)}
									>
										<i className='bx bx-trash'></i>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<Pagination />
			</div>
		</>
	)
}

export default Tester
