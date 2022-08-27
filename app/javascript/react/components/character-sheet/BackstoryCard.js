import React, { useState, useEffect } from "react"

const BackstoryCard = props => {
	const [chosen, setChosen] = useState(false)

	useEffect(() => {
		setChosen(props.selected)
	}, [props.selected])

	let selectButton
	if (props.selecting) {
		if (chosen) {
			selectButton =(
				<div className="cell small-12 text-center button-wrapper">
					<div id={props.id} onClick={props.selecting} className="button alert bold horizons-body-font skill-select-button select-button">
						Selected!
					</div>
				</div>
			)
		} else {
			selectButton = (
				<div className="cell small-12 text-center button-wrapper">
					<div id={props.id} onClick={props.selecting} className="button bold horizons-body-font skill-select-button select-button">
						Select
					</div>
				</div>
			)
		}
	}

	let first = true
	let flavorText = props.flavor_text.split("//").map( p => {
		if (first) {
			first = false
			return (
				<span key={p} ><i> {p} </i><br/> </span>
			)
		} else {
			return (
				<span key={p} ><i> &nbsp; {p} </i><br/> </span>
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
			{selectButton}
		</div>
	)
}

export default BackstoryCard