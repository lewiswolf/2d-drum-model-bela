export default function Drum(props, p5) {
	class Drum {
		// private
		#mouseState
		#isInsideDrum
		#polarCoords

		constructor(props) {
			// public vars
			this.x = props?.x || 0
			this.y = props?.y || 0
			this.diameter = props?.diameter || 0

			// public methods
			this.mouseDown = props?.mouseDown || null
			this.mouseUp = props?.mouseUp || null
			this.mouseDrag = props?.drag || null
			this.mouseDragExit = props?.dragExit || null

			// private vars
			this.#mouseState = false

			// private methods
			this.#isInsideDrum = (mousex, mousey) => p5.dist(
				mousex,
				mousey,
				this.x,
				this.y
			) < this.diameter / 2

			this.#polarCoords = (mousex, mousey) => {
				const x = mousex - this.x
				const y = mousey - this.y
				return {
					r: Math.sqrt(x * x + y * y) / (this.diameter * 0.5),
					theta: Math.atan2(y, x),
				}
			}

			// listeners
			window.addEventListener('mousedown', (e) => {
				if (this.#isInsideDrum(p5.mouseX, p5.mouseY) && e.button === 0) {
					this.mouseDown && this.mouseDown(this.#polarCoords(p5.mouseX, p5.mouseY))
					this.#mouseState = true
				}
			})
			window.addEventListener('mouseup', (e) => {
				if (this.#isInsideDrum(p5.mouseX, p5.mouseY) && e.button === 0) {
					this.mouseUp && this.mouseUp(this.#polarCoords(p5.mouseX, p5.mouseY))
					this.#mouseState = false
				}
			})
			window.addEventListener('mousemove', (e) => {
				if (this.#isInsideDrum(p5.mouseX, p5.mouseY) && e.buttons === 1) {
					this.mouseDrag && this.mouseDrag(this.#polarCoords(p5.mouseX, p5.mouseY))
					this.#mouseState = true
				}
				if (!this.#isInsideDrum(p5.mouseX, p5.mouseY) && e.buttons === 1 && this.#mouseState) {
					this.mouseDragExit && this.mouseDragExit(this.#polarCoords(p5.mouseX, p5.mouseY))
					this.#mouseState = false
				}
			})
		}

		render = (dimensions) => {
			// paint location
			this.x = dimensions.x
			this.y = dimensions.y
			this.diameter = dimensions.diameter
			// return ellipse
			p5.strokeWeight(6)
			p5.ellipse(this.x, this.y, this.diameter)
		}
	}
	return new Drum(props)
}