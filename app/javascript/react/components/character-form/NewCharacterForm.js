import React, { useState } from "react"
import NameForm from "./NameForm"
import RoleForm from "./RoleForm"

const NewCharacterForm = props => {
	const [options, setOptions] = useState({})
	const [formPayload, setFormPayload] = useState({})
	const [currentStep, setCurrentStep] = useState(0)

	const fetchOptions = async () => {
		try {
			const response = await fetch("/api/v1/characters/new")
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`
				const error = new Error (errorMessage)
				throw(error)
			}
			const optionsObject = await response.json()
			setOptions(optionsObject.edition)
			setFormPayload({
				...optionsObject.edition.blank_character,
				name: "",
				vitality: 2,
				current_vitality: 2
			})
		} catch (error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}

	// debugger

	useState(() => {
		fetchOptions()
	}, [])

	const stepZero = (
		<NameForm 
			setFormPayload={setFormPayload}
			setCurrentStep={setCurrentStep}
			currentStep={currentStep}
			formPayload={formPayload}
		/>
	)

	const stepTwo =(
		<RoleForm
		setFormPayload={setFormPayload}
		setCurrentStep={setCurrentStep}
		currentStep={currentStep}
		formPayload={formPayload}
		roles={options.roles}
		/>
	)

	const stepArray = [stepZero, stepTwo]

	let form = stepArray.at(currentStep)

	return (
		<div>
			<div className="character-form-header text-center" >
				<h1 className="horizons-title-font"> New Character </h1>
				<hr/>
			</div>
			<div className="character-form-body" >
				{form}
			</div>
		</div>
	)
}

export default NewCharacterForm