/*
	Class for the drum GUI;
	features include
		- responsive painting
		- custom mouse and touch handlers
*/

export default class Drum {
	// private
	#mouseState
	#isInsideDrum
	#polarCoords

	constructor(props, p5) {
		// p5
		this.p5 = p5

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
		this.#isInsideDrum = () => this.p5.dist(
			this.p5.mouseX,
			this.p5.mouseY,
			this.x,
			this.y
		) < this.diameter / 2

		this.#polarCoords = () => {
			const x = this.p5.mouseX - this.x
			const y = this.p5.mouseY - this.y
			return {
				r: Math.min(Math.sqrt(x * x + y * y) / (this.diameter * 0.5), 1.0),
				theta: Math.atan2(y, x),
			}
		}

		// touch listeners
		window.addEventListener('touchstart', (e) => {
			e.preventDefault()
			if (this.#isInsideDrum() && e.cancelable) {
				this.mouseDown && this.mouseDown(this.#polarCoords())
				this.#mouseState = true
			}
		})
		window.addEventListener('touchend', (e) => {
			e.preventDefault()
			if (this.#isInsideDrum() && e.cancelable) {
				this.mouseUp && this.mouseUp(this.#polarCoords())
				this.#mouseState = false
			}
		})
		window.addEventListener('touchcancel', () => {
			if (this.#isInsideDrum()) {
				this.mouseUp && this.mouseUp(this.#polarCoords())
				this.#mouseState = false
			}
		})
		window.addEventListener('touchmove', () => {
			if (this.#isInsideDrum()) {
				this.mouseDrag && this.mouseDrag(this.#polarCoords())
				this.#mouseState = true
			}
			if (!this.#isInsideDrum() && this.#mouseState) {
				this.mouseDragExit && this.mouseDragExit(this.#polarCoords())
				this.#mouseState = false
			}
		})

		// mouse listeners
		window.addEventListener('mousedown', (e) => {
			if (this.#isInsideDrum() && e.button === 0) {
				this.mouseDown && this.mouseDown(this.#polarCoords())
				this.#mouseState = true
			}
		})
		window.addEventListener('mouseup', (e) => {
			if (this.#isInsideDrum() && e.button === 0) {
				this.mouseUp && this.mouseUp(this.#polarCoords())
				this.#mouseState = false
			}
		})
		window.addEventListener('mousemove', (e) => {
			if (this.#isInsideDrum() && e.buttons === 1) {
				this.mouseDrag && this.mouseDrag(this.#polarCoords())
				this.#mouseState = true
			}
			if (!this.#isInsideDrum() && e.buttons === 1 && this.#mouseState) {
				this.mouseDragExit && this.mouseDragExit(this.#polarCoords())
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
		this.p5.strokeWeight(6)
		this.p5.ellipse(this.x, this.y, this.diameter)
	}
}