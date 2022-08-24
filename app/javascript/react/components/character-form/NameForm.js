import React, { useEffect, useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

library.add(faArrowLeft, faArrowRight)

const NameForm = props => {
	const [errors, setErrors] = useState(false)

	const changeHandler = event => {
		props.setFormPayload({
			...props.formPayload,
			name: event.currentTarget.value
		})
	}

	const stepForward = event => {
		if (catchErrors()) {
			props.setCurrentStep(props.currentStep + 1)
		} else {
			setErrors(true)
		}
	}

	const catchErrors = () => {
		if (props.formPayload.name.trim() == "") {
			return false
		} else {
			return true
		}
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="callout horizons-body-font error-bar" >
				Your character needs a name!
			</div>
		)
	}

	return (
		<div >
			<h3 className="horizons-body-font" > Let's get started then...</h3>
			<span className="horizons-body-font"> First, your character will need a name! Don't worry about writing out their life story just yet, you'll be able to edit their backstory and upload images after the guided character creation. </span>
			
			<form className="form-section" >

				{errorBar}
				<label className="horizons-body-font" > 
					<input
						className="input"
						name="name"
						id="name"
						type="text"
						onChange={changeHandler}
						value={props.formPayload.name}
					/>
					Character Name
				</label>

			</form>
			
			<div className="navigation-arrows grid-x grid-margin-x" >

				<div className="cell auto text-right horizons-body-font">
					<span onClick={stepForward} className="bold nav-arrow-text edit-toggle"> 
						Next &nbsp; <FontAwesomeIcon className="nav-arrow" icon="fa-solid fa-arrow-right" />
					</span>
				</div>

			</div>

		</div>
	)
}

export default NameForm