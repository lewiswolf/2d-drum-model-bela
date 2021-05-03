export default function Drum(props, p5) {
	class Drum {
		#mouseState

		constructor(props) {
			// public
			this.x = props?.x || 0
			this.y = props?.y || 0
			this.diameter = props?.diameter || 0
			// methods
			this.mouseDown = props?.mouseDown || null
			this.mouseUp = props?.mouseUp || null
			this.mouseDrag = props?.drag || null
			this.mouseDragExit = props?.dragExit || null
			// private
			this.#mouseState = false
		}

		handleEvents = () => {
			let isInsideDrum = p5.dist(
				p5.mouseX,
				p5.mouseY,
				this.x,
				this.y
			) < this.diameter / 2
			// mousedown
			if (p5.mouseIsPressed && !this.#mouseState && isInsideDrum) {
				this.mouseDown && this.mouseDown()
				this.#mouseState = true
			}
			// mouseup
			if (!p5.mouseIsPressed && this.#mouseState && isInsideDrum) {
				this.mouseUp && this.mouseUp()
				this.#mouseState = false
			}
			// drag
			if (p5.mouseIsPressed && this.#mouseState && isInsideDrum) {
				this.mouseDrag && this.mouseDrag()
			}
			// dragexit
			if (p5.mouseIsPressed && this.#mouseState && !isInsideDrum) {
				this.mouseDragExit && this.mouseDragExit()
				this.#mouseState = false
			}
		}

		render = (dimensions) => {
			// paint location
			this.x = dimensions.x
			this.y = dimensions.y
			this.diameter = dimensions.diameter
			// handle events
			this.handleEvents()
			// return ellipse
			p5.strokeWeight(6)
			p5.ellipse(this.x, this.y, this.diameter)
		}
	}
	return new Drum(props)
}