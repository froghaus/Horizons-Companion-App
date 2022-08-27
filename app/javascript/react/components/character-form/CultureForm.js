import React, { useState, useEffect } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import CultureCard from "./CultureCard.js"

library.add(faArrowLeft, faArrowRight)

const CultureForm = props => {
	const [errors, setErrors] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
	
	const stepForward = event => {
		if (catchErrors()) {
			props.setCurrentStep(props.currentStep + 1)
		} else {
			setErrors(true)
		}
	}

	const stepBackward = event => {
		props.setCurrentStep(props.currentStep - 1)
	}

	const catchErrors = () => {
		if (props.formPayload.culture_id == null) {
			return false
		} else {
			return true
		}
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="cell small-4 callout horizons-body-font error-bar" >
				You need to select a Culture before continuing!
			</div>
		)
	}

	let cultures = props.cultures.filter(item => item.title !== "No Culture")
	let cultureOptions = cultures.map(culture => {
		return (
			<CultureCard
				key={culture.id}
				id={culture.id}
				title={culture.title}
				description={culture.description}
        aspect_bonus_options={culture.aspect_bonus_options}
				setFormPayload={props.setFormPayload}
				formPayload={props.formPayload}
				setCurrentStep={props.setCurrentStep}
				currentStep={props.currentStep}
			/>
		)
	})


	return (
		<div >
			<h3 className="horizons-body-font" > Where do you come from? </h3>
			<span className="horizons-body-font"> 
				Your <strong> Culture </strong> determines where your character comes from, or perhaps how they perceive themself now. Each Culture has a collection of <strong> knacks </strong> reflecting your position in such a society, and will also improve some of your <i> Aspect </i> dice. <br/>
			</span>
			<span className="horizons-body-font"> 
				&nbsp; Take a look at the cultures below and choose one which speaks to you and your character.
			</span>
			
			<div className="form-section">
				<div className="grid-x grid-margin-x">
					{cultureOptions}
				</div>
			</div>

			<div className="navigation-arrows grid-x grid-margin-x" >

				<div className="cell auto text-left horizons-body-font">
					<span onClick={stepBackward} className="bold nav-arrow-text edit-toggle"> 
						<FontAwesomeIcon className="nav-arrow" icon="fa-solid fa-arrow-left" />
						&nbsp; Previous
					</span>
				</div>
				{errorBar}
				<div className="cell auto text-right horizons-body-font">
					<span onClick={stepForward} className="bold nav-arrow-text edit-toggle"> 
						Next &nbsp; <FontAwesomeIcon className="nav-arrow" icon="fa-solid fa-arrow-right" />
					</span>
				</div>

			</div>

		</div>
	)
}

export default CultureForm