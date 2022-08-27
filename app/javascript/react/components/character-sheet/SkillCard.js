import React, { useState, useEffect, Fragment } from "react"

const SkillCard = props => {
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

	let triggerBox
	if (props.trigger) {
		triggerBox = (
			<div className="cell small-12 trigger-box horizons-body-font">
				<strong>Trigger:</strong> {` ${props.trigger}`}
			</div>
		)
	}

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

	let actionTypeBox
	if (props.focus) {
		actionTypeBox = (
			<div className={`cell shrink ${props.action_type} skill-card-action-line horizons-body-font`} > 
				{props.action_type} <i>{" (Focus)"}</i> 
			</div>
		)
	} else {
		actionTypeBox = (
			<div className={`cell shrink ${props.action_type} skill-card-action-line horizons-body-font`} > 
				{props.action_type} 
			</div>
		)
	}

	return (
    <div className="cell small-12 medium-6 large-4 grid-x skill-card-border">
      <div className="cell auto skill-card-title-line horizons-title-font bold" > {props.title} </div>
      {actionTypeBox}
      {triggerBox}
      <div className="cell small-12 card-text-section horizons-body-font">
        {text}
        {options}
      </div>
      {selectButton}
    </div>
	)
}

export default SkillCard