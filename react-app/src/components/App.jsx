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
			radiusOfDrum: 35,
			decayTime: 1000,
		}
	}

	componentDidMount() {
		// listeners for when Bela is connected/disconnected
		window.addEventListener('BelaConnected', () => {
			this.setState({ belaLoaded: true })
			Bela.sendBuffer(0, 'float', this.state.radiusOfDrum)
			Bela.sendBuffer(1, 'float', this.state.decayTime)
		})
		window.addEventListener('BelaDisconnected', () =>
			this.setState({ belaLoaded: false, radiusOfDrum: 35, decayTime: 1000 })
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
								<p>{`Radius of Drum: ${this.state.radiusOfDrum}cm`}</p>
								<Slider
									ariaLabel='slider controlling the radius of a drum'
									fidelity={99}
									value={this.state.radiusOfDrum - 1}
									onChange={(i) => {
										i++
										Bela.sendBuffer(0, 'float', i)
										this.setState({ radiusOfDrum: i })
									}}
								/>
							</div>
							<div>
								<p>{`Decay Time: ${this.state.decayTime}ms`}</p>
								<Slider
									ariaLabel='slider copntrolling the decay time of a sound'
									fidelity={9980}
									value={2000}
									onChange={(i) => {
										i += 20
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
