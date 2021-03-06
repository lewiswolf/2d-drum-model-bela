/*
	Originally written for this project:
	https://github.com/lewiswolf/lewiswolstanholme
	Inserts a p5 canvas that fits within any responsive container
*/

import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import P5Wrapper from 'react-p5-wrapper'

export default class p5 extends PureComponent {
	static defaultProps = {
		src: '',
	}

	constructor(props) {
		super(props)
		this.state = {
			height: 0,
			width: 0,
			mounted: false,
		}
		this.resize.bind(this)
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize)
		const parent = findDOMNode(this).parentElement.getBoundingClientRect()
		this.setState({
			height: parent.height,
			width: parent.width,
			mounted: true,
		})
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize)
	}

	resize = () => {
		const parent = findDOMNode(this).parentElement.getBoundingClientRect()
		if ([this.state.height, this.state.width] !== [parent.height, parent.width]) {
			this.setState({
				height: parent.height,
				width: parent.width,
			})
		}
	}

	render() {
		return (
			<div
				className='p5'
				onContextMenu={(e) => e.preventDefault()}
				style={{
					height: 'fit-content',
					width: 'fit-content',
					userSelect: 'none',
					touchAction: 'none',
					fontSize: 0,
				}}
			>
				{this.state.mounted && (
					<P5Wrapper height={this.state.height} width={this.state.width} sketch={this.props.src} />
				)}
			</div>
		)
	}
}
