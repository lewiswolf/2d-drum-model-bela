import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

export default class Head extends Component {
	static defaultProps = {
		description: '',
	}

	constructor(props) {
		super(props)
		this.state = {
			title: '',
			favicon: '',
			appleIcon: '',
			themeColor: '',
		}
	}

	// load metadata from the manifest.json
	componentDidMount() {
		fetch(`${process.env.PUBLIC_URL}/manifest.json`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					title: json.name,
					favicon: json.icons[0].src,
					appleIcon: json.icons[1].src,
					themeColor: json.theme_color,
				})
			})
	}

	render() {
		return (
			<Helmet>
				<title>{this.state.title}</title>
				<meta charset='utf-8' />
				<meta http-equiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content={this.state.themeColor} />
				<meta name='description' content={this.props.description} />
				<link rel='manifest' href={`${process.env.PUBLIC_URL}/manifest.json`} />
				<link rel='apple-touch-icon' href={`${process.env.PUBLIC_URL}/${this.state.appleIcon}`} />
				<link rel='icon' href={`${process.env.PUBLIC_URL}/${this.state.favicon}`} />
			</Helmet>
		)
	}
}
