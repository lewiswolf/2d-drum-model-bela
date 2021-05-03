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

			const polarCoords = (mousex, mousey) => {
				const x = mousex - this.x
				const y = mousey - this.y
				return {
					r: Math.sqrt(x * x + y * y) / (this.diameter * 0.5),
					theta: Math.atan2(y, x),
				}
			}

			// mousedown
			if (p5.mouseIsPressed && !this.#mouseState && isInsideDrum) {
				this.mouseDown && this.mouseDown(polarCoords(p5.mouseX, p5.mouseY))
				this.#mouseState = true
			}
			// mouseup
			if (!p5.mouseIsPressed && this.#mouseState && isInsideDrum) {
				this.mouseUp && this.mouseUp(polarCoords(p5.mouseX, p5.mouseY))
				this.#mouseState = false
			}
			// drag
			if (p5.mouseIsPressed && this.#mouseState && isInsideDrum) {
				this.mouseDrag && this.mouseDrag(polarCoords(p5.mouseX, p5.mouseY))
			}
			// dragexit
			if (p5.mouseIsPressed && this.#mouseState && !isInsideDrum) {
				this.mouseDragExit && this.mouseDragExit(polarCoords(p5.mouseX, p5.mouseY))
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