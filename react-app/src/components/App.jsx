// packages
import React from 'react'
import { Slider } from 'maxmsp-gui'
// import Bela from '../BelaAPI'

// components
import Head from './head'
import P5 from './p5'
import sketch from '../sketch/sketch'

// scss
import '../scss/App.scss'
import 'maxmsp-gui/dist/index.css'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			belaLoaded: true,
			// belaLoaded: Bela.readyState === 1 ? true : false, // is the Bela ws connected?
		}
	}

	componentDidMount() {
		// listeners for when Bela is connected/disconnected
		// window.addEventListener('BelaConnected', () => this.setState({ belaLoaded: true }))
		// window.addEventListener('BelaDisconnected', () => this.setState({ belaLoaded: false }))
	}

	render() {
		return (
			<React.Fragment>
				<Head />
				{!this.state.belaLoaded ? (
					<p>There is no Bela connected... 🧑‍💻</p>
				) : (
					<main>
						<h1>2D Drum Model</h1>
						<div className='params'>
							<Slider />
						</div>
						<div className='p5-container'>
							<P5 src={sketch} />
						</div>
					</main>
				)}
			</React.Fragment>
		)
	}
}
