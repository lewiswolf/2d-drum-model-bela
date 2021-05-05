/*
	root p5 sketch. 
	imports the drum and defines it's position.
*/

import Bela from '../BelaAPI'
import Drum from './drum'

export default function sketch(p5) {
	let
		reactProps = {
			height: 0,
			width: 0,
		},
		drum

	// handle props from react
	p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		reactProps = {
			height: props.height,
			width: props.width
		}
		p5.resizeCanvas(reactProps.width, reactProps.height)
	}

	p5.setup = () => {
		// create canvas and drum
		p5.createCanvas(reactProps.width, reactProps.height)
		drum = Drum({
			x: reactProps.width / 2,
			y: reactProps.height / 2,
			diameter: reactProps.width * 0.95,
			mouseDown: (pol) => Bela.sendBuffer(2, 'float', [0, pol.r, pol.theta]),
			mouseUp: (pol) => Bela.sendBuffer(2, 'float', [1, pol.r, pol.theta]),
			drag: (pol) => Bela.sendBuffer(2, 'float', [2, pol.r, pol.theta]),
			dragExit: (pol) => Bela.sendBuffer(2, 'float', [3, pol.r, pol.theta]),
		}, p5)
	}

	p5.draw = () => {
		// place and render drum
		drum.render({
			x: reactProps.width / 2,
			y: reactProps.height / 2,
			diameter: reactProps.width * 0.95,
		})
	}
}