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
		// circular drum membrane
		drum = Drum({
			x: 0,
			y: 0,
			diameter: 0,
			mouseDown: () => console.log('mouseDown'),
			mouseUp: () => console.log('mouseUp'),
			drag: () => console.log('mouseDrag'),
			dragExit: () => console.log('mouseDragExit'),
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