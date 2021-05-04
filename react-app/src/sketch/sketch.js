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
			// x: 0,
			// y: 0,
			// diameter: 0,
			mouseDown: (pol) => Bela.sendBuffer(0, 'float', [pol.r, pol.theta]),
			// mouseUp: (pol) => console.log(`mouseUp ${pol.r} theta: ${pol.theta}`),
			// drag: (pol) => console.log(`mouseDrag ${pol.r} theta: ${pol.theta}`),
			// dragExit: (pol) => console.log(`mouseDragExit ${pol.r} theta: ${pol.theta}`),
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