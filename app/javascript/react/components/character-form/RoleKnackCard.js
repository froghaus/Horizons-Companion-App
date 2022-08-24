import React from "react"

const RoleKnackCard = props => {

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

	return (
		<div className="cell small-12 medium-8 large-6 knack-card about-section-mini" >
			<h6 className="text-left horizons-title-font bold"> {`${props.title}`} </h6>
			<hr/>
			<div className="horizons-body-font card-text-section" >
				{text}
			</div>
		</div>
	)
}

export default RoleKnackCard