import React from "react"

const KnackCard = props => {

	let first = true
	const text = props.rules_text.split("//").map( p => {
		if (first) {
			first = false
			return (
				<span key={p} > {p} <br/> </span>
			)
		} else {
			return (
				<span key={p} > &nbsp; {p} <br/> </span>
			)
		}
	})

	let options
	if (props.options) {
		let bullets = props.options.split("//").map( option => {
			return (
				<li key={option} > {option} </li>
			)
		})

		options = (
			<ul >
				{bullets}
			</ul>
		)
	}

	return (
		<div className="cell small-12 medium-6 large-4 about-section-mini" >
			<h6 className="text-left horizons-title-font bold"> {`${props.title}`} </h6>
			<hr/>
			<div className="horizons-body-font card-text-section" >
				{text}
				{options}
			</div>
		</div>
	)
}

export default KnackCard