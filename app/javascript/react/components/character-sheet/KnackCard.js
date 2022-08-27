import { checkPropTypes } from "prop-types"
import React, { useEffect, useState } from "react"

const KnackCard = props => {
	const [chosen, setChosen] = useState(false)

	useEffect(() => {
		setChosen(props.selected)
	}, [props.selected])

	let selectButton
	if (props.selecting) {
		if (chosen) {
			selectButton =(
				<div className="cell small-6">
					<div id={props.id} onClick={props.selecting} className="button alert bold horizons-body-font expanded select-button">
						Selected!
					</div>
				</div>
			)
		} else {
			selectButton = (
				<div className="cell small-6">
					<div id={props.id} onClick={props.selecting} className="button bold horizons-body-font expanded select-button">
						Select
					</div>
				</div>
			)
		}
	}

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
			<div className="grid-x grid-margin-x">
				<h6 className="cell auto text-left horizons-title-font bold"> {`${props.title}`} </h6>
				{selectButton}
			</div>
			<hr/>
			<div className="horizons-body-font card-text-section" >
				{text}
				{options}
			</div>
		</div>
	)
}

export default KnackCard