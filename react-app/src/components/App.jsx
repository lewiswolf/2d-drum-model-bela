// packages
import React from 'react'
import Bela from '../Bela API'

// components
import Head from './head'

// scss
import '../scss/App.scss'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			belaLoaded: Bela.readyState === 1 ? true : false, // is the Bela ws connected?
		}
	}

	componentDidMount() {
		// listeners for when Bela is connected/disconnected
		window.addEventListener('BelaConnected', () => this.setState({ belaLoaded: true }))
		window.addEventListener('BelaDisconnected', () => this.setState({ belaLoaded: false }))
	}

	render() {
		// this.state.belaLoaded && Bela.sendBuffer(0, 'float', ['1', '1', '1', '1'])
		return (
			<React.Fragment>
				<Head description='2-dimensional physically modelled drum running on Bela' />
				<p style={{ display: !this.state.belaLoaded ? 'block' : 'none' }}>
					There is no Bela connected... 🧑‍💻
				</p>
				<main style={{ display: this.state.belaLoaded ? 'block' : 'none' }}>This is where the GUI goes.</main>
			</React.Fragment>
		)
	}
}
