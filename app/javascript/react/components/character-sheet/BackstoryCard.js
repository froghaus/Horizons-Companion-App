import React from "react"

const BackstoryCard = props => {

	let first = true
	let flavorText = props.flavor_text.split("//").map( p => {
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
		<div className="cell small-12 large-6 grid-x skill-card-border">
			<div className="cell small-8 skill-card-title-line horizons-title-font bold" > {props.title} </div>
			<div className={`cell small-4 ${props.type} skill-card-action-line horizons-body-font`} > 
				{props.type} 
			</div>
			<div className="cell small-12 grid-x card-text-section horizons-body-font">
				<div className="flavor-box horizons-body-font">
					{flavorText}
				</div>
				<ul>
					<li> {props.passive} </li>
					<li> {props.trigger} </li>
				</ul>
			</div>
		</div>
	)
}

export default BackstoryCard