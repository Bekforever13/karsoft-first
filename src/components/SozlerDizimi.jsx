import React from 'react'
import { Table } from 'antd'

const SozlerDizimi = () => {
	const dataSource = ['dabil']

	return (
		<div>
			<Table columns={3} dataSource={dataSource} />
		</div>
	)
}

export default SozlerDizimi
