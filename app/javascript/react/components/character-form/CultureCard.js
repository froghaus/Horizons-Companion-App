import React, { Fragment, useState } from "react"

const CultureCard = props => {

	const selectCulture = () => {
		props.setFormPayload({
			...props.formPayload,
			culture_id: props.id,
			culture_knack: null,
		})
		delayedStep()
	}

	const delayedStep = () => {
		props.setCurrentStep(props.currentStep + 1)
	}

	let selectButton
	if (props.formPayload.culture_id == props.id) {
		selectButton = (
			<div className="selected-option"> Selected! </div>
		)
	} else {
		selectButton = (
			<div onClick={selectCulture} className="button expanded important-button bold horizons-body-font" > Select this Culture </div>
		)
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

	let dieBonus = props.aspect_bonus_options.map(option => {
		return (
			<span key={option} className="bold" > 
				<i>&nbsp; {option} &nbsp;</i>
			</span>
		)
	})

	return (
		<div className="cell small-12 large-6 about-section-mini role-card">
      <div >
        <h6 className="horizons-title-font bold culture-card-header"> {props.title} </h6>
        <hr />
      </div>
      <div className="horizons-body-font card-text-section" >
        {text}
      
        <p className="text-center role-feature-header" > When you set your <i> Aspect </i> dice, you can take a bonus to two of the following dice: </p>

        <div className="text-center bottom-element">
          {dieBonus}
        </div>
      </div>
      <div> {selectButton} </div>
    </div>
	)
}

export default CultureCard