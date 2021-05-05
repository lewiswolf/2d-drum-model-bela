// packages
import React from 'react'
import { Slider } from 'maxmsp-gui'
import Bela from '../BelaAPI'

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
			belaLoaded: Bela.readyState === 1 ? true : false, // is the Bela ws connected?
			sizeOfDrum: 0,
			decayTime: 0,
		}
	}

	componentDidMount() {
		// listeners for when Bela is connected/disconnected
		window.addEventListener('BelaConnected', () => this.setState({ belaLoaded: true }))
		window.addEventListener('BelaDisconnected', () =>
			this.setState({ belaLoaded: false, sizeOfDrum: 0, decayTime: 0 })
		)
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
							<div>
								<p>{`Size of Drum: ${this.state.sizeOfDrum}cm`}</p>
								<Slider
									ariaLabel='slider controlling the size of a drum'
									fidelity={10000}
									value={this.state.sizeOfDrum}
									onChange={(i) => {
										Bela.sendBuffer(0, 'float', i)
										this.setState({ sizeOfDrum: i })
									}}
								/>
							</div>
							<div>
								<p>{`Decay Time: ${this.state.decayTime}ms`}</p>
								<Slider
									ariaLabel='slider copntrolling the decay time of a sound'
									fidelity={10000}
									value={this.state.decayTime}
									onChange={(i) => {
										Bela.sendBuffer(1, 'float', i)
										this.setState({ decayTime: i })
									}}
								/>
							</div>
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
