import React, { useEffect, useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import RoleCard from "./RoleCard"
import { set } from "lodash"

library.add(faArrowLeft, faArrowRight)

const RoleForm = props => {
	const [errors, setErrors] = useState(false)
	// const [selected, setSelected] = useState(null)

	// useEffect(() => {
	// 	setSelected(props.formPayload.role_id)
	// }, [])
	
	const changeHandler = event => {
		props.setFormPayload({
			...props.formPayload,
			name: event.currentTarget.name
		})
	}

	const stepForward = event => {
		if (catchErrors()) {
			props.setCurrentStep(props.currentStep + 1)
		} else {
			setErrors(true)
		}
	}

	const stepBackward = event => {
		if (catchErrors()) {
			props.setCurrentStep(props.currentStep - 1)
		} else {
			setErrors(true)
		}
	}

	const catchErrors = () => {
		if (props.formPayload.role_id == null) {
			return false
		} else {
			return true
		}
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="cell small-4 callout horizons-body-font error-bar" >
				You need to select a role before leaving!
			</div>
		)
	}

	let roles = props.roles.filter(item => item.title !== "No Role")
	let roleOptions = roles.map(role => {
		return (
			<RoleCard
				key={role.id}
				id={role.id}
				title={role.title}
				description={role.description}
				starting_skills={role.starting_skills}
				ability={role.ability}
				reaction_bonus={role.reaction_bonus}
				combat_die={role.combat_die}
				proficiencies={role.proficiencies}
				training={role.training}
				growth_opportunities={role.growth_opportunities}
				setFormPayload={props.setFormPayload}
				formPayload={props.formPayload}
			/>
		)
	})


	return (
		<div >
			<h3 className="horizons-body-font" > What role will you play? </h3>
			<span className="horizons-body-font"> 
				Perhaps more than any other choice during character creation, your <strong> Role</strong> will determine what your character can do in the game. Which role you pick will determine your starting abilities, and you'll gain access to a suite of <strong> skills </strong> and <strong> knacks </strong> relevant to that role's strengths. <br/>
			</span>
			<span className="horizons-body-font"> 
				&nbsp; Take a look at the roles below and choose one which speaks to you and your character.
			</span>
			
			<div className="form-section">
				<div className="grid-x grid-margin-x">
					{roleOptions}
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

export default RoleForm