import React from 'react'
import P5 from './p5'

import Head from './head'

import '../scss/App.scss'

export default function App() {
	return (
		<React.Fragment>
			<Head description='2-dimensional physically modelled drum running on Bela' />
			<p>some text for now</p>
			<div style={{ height: 300, width: 300, placeSelf: 'center' }} className='p5-container'>
				<P5 src='../sketch/drum.js' />
			</div>
		</React.Fragment>
	)
}
