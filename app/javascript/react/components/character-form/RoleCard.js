import React, { Fragment, useState } from "react"
import RoleSkillCard from "./RoleSkillCard"
import RoleKnackCard from "./RoleKnackCard"
import { delay } from "lodash"

const RoleCard = props => {
	const [expanded, setExpanded] = useState(false)

	const selectRole = () => {
		props.setFormPayload({
			...props.formPayload,
			role_id: props.id,
			taken_skills: [],
			role_knack: null,
			role_title: props.title
		})
		delayedStep()
	}

	const delayedStep = () => {
		props.setCurrentStep(props.currentStep + 1)
	}

	let selectButton
	if (props.formPayload.role_id == props.id) {
		selectButton = (
			<div className="selected-option"> Selected! </div>
		)
	} else {
		selectButton = (
			<div onClick={selectRole} className="button expanded important-button bold horizons-body-font" > Select this Role </div>
		)
	}


	const toggleExpanded = (event) => {
		if (expanded) {
			setExpanded(false)
		} else {
			setExpanded(true)
		}
	}

	let reactionBonus
	if (props.reaction_bonus == "Special") {
		reactionBonus = "all your reaction dice go up one level."
	} else {
		reactionBonus = `your ${props.reaction_bonus} reaction die goes up one level.`
	}

	let first = true
	const text = props.description.split("//").map(span => {
		if (first) {
			first = false
			return (
				<span key={span} > {span} <br/> </span>
			)
		} else {
			return (
				<span key={span} > &nbsp; {span} <br/> </span>
			)
		}
	})

	const startingSkills = props.starting_skills.map( skill => {
		return (
			<RoleSkillCard 
				key={skill.id}
				title={skill.title}
				action_type={skill.action_type}
				focus={skill.focus}
				trigger={skill.trigger}
				rules_text={skill.rules_text}
				options={skill.options}
			/>
		)
	})

	let growth = props.growth_opportunities.map(growth => {
		return (
			<li key={growth}> 
				{growth}
			</li>
		)
	})

	let card
	if (expanded) {
		card = (
			<div className="cell small-12 about-section-mini role-card">
				<div onClick={toggleExpanded} >
					<h6 className="horizons-title-font bold card-section-header"> The {props.title} </h6>
					<hr />
				</div>
				<div className="horizons-body-font card-text-section" >
					<div className="grid-x grid-margin-x">
						<div className="cell small-12 large-6 about-section-mini" >
							<h6 className="text-left horizons-title-font bold"> Proficiencies: </h6>
							<hr/>
							<div className="horizons-body-font" >
								{props.proficiencies} &nbsp;
								<i className="reminder-text" >{`(You take +1 to any roll using one of these.)`}</i> 
							</div>
						</div>

						<div className="cell small-12 large-6 about-section-mini" >
							<h6 className="text-left horizons-title-font bold"> Training: </h6>
							<hr/>
							<div className="horizons-body-font" >
								{props.training} &nbsp;
								<i className="reminder-text" >{`(You can use these all without taking disadvantage.)`}</i> 
							</div>
						</div>
					</div>

					<p className="text-center role-feature-header"> Your role ability is <strong> {props.ability.title} </strong></p>
					<div className="grid-x">
						<RoleKnackCard
							title={props.ability.title}
							rules_text={props.ability.text}
						/>
					</div>
					<p className="role-feature-header text-center"> You also start with the following skills...<br/></p>
					<div className="grid-x grid-margin-x">
						{startingSkills}
					</div>

					<p className="text-center role-feature-header" > You gain experience whenever you... </p>
					
					<ul className="growth-list">
						{growth}
					</ul>
					<div className="role-addendum-box">
						<p className="text-center" > 
							Additionally, your <i> Combat </i> die is a d{props.combat_die}, <br/> and {reactionBonus} 
						</p>
					</div>
					<div> {selectButton} </div>
				</div>
			</div>
		)
	} else {
		card = (
			<div onClick={toggleExpanded} className="cell small-12 about-section-mini expandable role-card" >
				<h4 className="horizons-title-font text-center bold"> The {props.title} </h4>
				<hr/>
				<div className="horizons-body-font card-text-section" >
					{text}
				</div>
			</div>
		)
	}

	return (
		<Fragment>
			{card}
		</Fragment>
	)
}

export default RoleCard