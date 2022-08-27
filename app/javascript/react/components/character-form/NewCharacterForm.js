import React, { useState } from "react"
import NameForm from "./NameForm"
import RoleForm from "./RoleForm"
import RoleOptionsForm from "./RoleOptionsForm"
import CultureForm from "./CultureForm"
import CultureOptionsForm from "./CultureOptionsForm"
import BackstoryForm from "./BackstoryForm"
import DiceForm from "./DiceForm"
import { Link } from "react-router-dom"

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
				user_id: optionsObject.edition.current_user.id,
				name: "",
				vitality: 2,
				current_vitality: 2,
				taken_skills: [],
				role_knack: null,
				culture_knack: null,
				role_name: "",
				misfortune_id: false,
				anxiety_id: false
			})
		} catch (error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}

	const finalizeCharacter = async () => {
		let payload = new FormData()
		payload.append("anxiety_id", formPayload.anxiety_id)
		payload.append("athletic", formPayload.athletic)
		payload.append("athletic_bonus", formPayload.athletic_bonus)
		payload.append("bonus_to_carry_capacity", formPayload.bonus_to_carry_capacity)
		payload.append("bonus_to_health", formPayload.bonus_to_health)
		payload.append("bonus_to_rest_pool", formPayload.bonus_to_rest_pool)
		payload.append("bonus_to_willpower", formPayload.bonus_to_willpower)
		payload.append("combat", formPayload.combat)
		payload.append("combat_bonus", formPayload.combat_bonus)
		payload.append("convincing", formPayload.convincing)
		payload.append("convincing_bonus", formPayload.convincing_bonus)
		payload.append("culture_id", formPayload.culture_id)
		payload.append("culture_knack", formPayload.culture_knack)
		payload.append("current_stress", formPayload.current_stress)
		payload.append("current_vitality", formPayload.current_vitality)
		payload.append("experience", formPayload.experience)
		payload.append("expressive", formPayload.expressive)
		payload.append("expressive_bonus", formPayload.expressive_bonus)
		payload.append("graceful", formPayload.graceful)
		payload.append("graceful_bonus", formPayload.graceful_bonus)
		payload.append("grit", formPayload.grit)
		payload.append("grit_bonus", formPayload.grit_bonus)
		payload.append("intuitive", formPayload.intuitive)
		payload.append("intuitive_bonus", formPayload.intuitive_bonus)
		payload.append("misfortune_id", formPayload.misfortune_id)
		payload.append("motor", formPayload.motor)
		payload.append("motor_bonus", formPayload.motor_bonus)
		payload.append("name", formPayload.name)
		payload.append("passion_id", formPayload.passion_id)
		payload.append("perceptive", formPayload.perceptive)
		payload.append("perceptive_bonus", formPayload.perceptive_bonus)
		payload.append("physique", formPayload.physique)
		payload.append("physique_bonus", formPayload.physique_bonus)
		payload.append("reason", formPayload.reason)
		payload.append("reason_bonus", formPayload.reason_bonus)
		payload.append("reflexes", formPayload.reflexes)
		payload.append("reflexes_bonus", formPayload.reflexes_bonus)
		payload.append("resolve", formPayload.resolve)
		payload.append("resolve_bonus", formPayload.resolve_bonus)
		payload.append("role_id", formPayload.role_id)
		payload.append("role_knack", formPayload.role_knack)
		payload.append("rugged", formPayload.rugged)
		payload.append("rugged_bonus", formPayload.rugged_bonus)
		payload.append("social", formPayload.social)
		payload.append("social_bonus", formPayload.social_bonus)
		payload.append("studious", formPayload.studious)
		payload.append("studious_bonus", formPayload.studious_bonus)
		payload.append("subtle", formPayload.subtle)
		payload.append("subtle_bonus", formPayload.subtle_bonus)
		payload.append("tactile", formPayload.tactile)
		payload.append("tactile_bonus", formPayload.tactile_bonus)
		payload.append("taken_skills", formPayload.taken_skills)
		payload.append("vitality", formPayload.vitality)
		payload.append("wits", formPayload.wits)
		payload.append("wits_bonus", formPayload.wits_bonus)
		payload.append("user_id", formPayload.user_id)

		try {
			const response = await fetch(`/api/v1/characters/`, {
				credentials: "same-origin",
				method: "POST",
				body: payload
			})
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.status.text})`
				const error = new Error(errorMessage)
				throw(error)
			} else {
				setCurrentStep(currentStep + 1)
			}
		} catch(error) {
			console.log(`Error in fetch: ${error}`)
		}
	}

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

	const stepThree = (
		<RoleOptionsForm
			setFormPayload={setFormPayload}
			setCurrentStep={setCurrentStep}
			currentStep={currentStep}
			formPayload={formPayload}
			roles={options.roles}
		/>
	)

	const stepFour = (
		<CultureForm
			setFormPayload={setFormPayload}
			setCurrentStep={setCurrentStep}
			currentStep={currentStep}
			formPayload={formPayload}
			cultures={options.cultures}
		/>
	)

	const stepFive = (
		<CultureOptionsForm 
			setFormPayload={setFormPayload}
			setCurrentStep={setCurrentStep}
			currentStep={currentStep}
			formPayload={formPayload}
			cultures={options.cultures}
		/>
	)

	const stepSix = (
		<BackstoryForm
			setFormPayload={setFormPayload}
			setCurrentStep={setCurrentStep}
			currentStep={currentStep}
			formPayload={formPayload}
			passions={options.passions}
			anxieties={options.anxieties}
			misfortunes={options.misfortunes}
		/>
	)

	const stepSeven = (
		<DiceForm
			setFormPayload={setFormPayload}
			setCurrentStep={setCurrentStep}
			currentStep={currentStep}
			formPayload={formPayload}
			trait_dice={options.trait_dice}
			aspect_dice={options.aspect_dice}
			reaction_dice={options.reaction_dice}
			cultures={options.cultures}
			roles={options.roles}
			finalizeCharacter={finalizeCharacter}
		/>
	)

	const lastStep = (
		<div className="text-center" >
			<h3 className="horizons-body-font" > All set! </h3>
			<Link to="/characters" className="button bold horizons-body-font" > Return to Character Roster </Link>
		</div>
	)

	const stepArray = [stepZero, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven, lastStep]

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