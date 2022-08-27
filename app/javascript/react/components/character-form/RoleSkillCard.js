import React from "react"

const RoleSkillCard = props => {

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
			<div className={`cell small-5 ${props.action_type} skill-card-action-line horizons-body-font`} > 
				{props.action_type} &nbsp; <i>{"(Focus)"}</i> 
			</div>
		)
	} else {
		actionTypeBox = (
			<div className={`cell small-5 ${props.action_type} skill-card-action-line horizons-body-font`} > 
				{props.action_type} 
			</div>
		)
	}

	return (
		<div className="cell small-12 large-6 grid-x skill-card-border">
			<div className="cell small-7 skill-card-title-line horizons-title-font bold" > {props.title} </div>
			{actionTypeBox}
			{triggerBox}
			<div className="cell small-12 card-text-section horizons-body-font">
				{text}
				{options}
			</div>
		</div>
	)
}

export default RoleSkillCard