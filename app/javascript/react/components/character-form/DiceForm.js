import React, { useState, useEffect } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons"
import AspectBonusClickable from "./AspectBonusClickable"

library.add(faArrowLeft, faCheck)

const DiceForm = props => {
	const [errors, setErrors] = useState(false)
  const [dicePayload, setDicePayload] = useState({
    physique: null,
    motor: null,
    social: null,
    reason: null,
    wits: null,
    athletic: null,
    convincing: null,
    expressive: null,
    graceful: null,
    intuitive: null,
    perceptive: null,
    rugged: null,
    studious: null,
    subtle: null,
    tactile: null,
    combat: null,
    grit: null,
    reflexes: null,
    resolve: null
  })
  const [aspectBonusesAssignable, setAspectBonusesAssignable] = useState([])
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const selectedCulture = props.cultures.filter(culture => culture.id == props.formPayload.culture_id).at(0)
  const selectedRole = props.roles.filter(role => role.id == props.formPayload.role_id).at(0)
  const combat = selectedRole.combat_die

	const changeHandler = event => {
    let payload
    if (event.currentTarget.value == "") {
      payload = null
    } else {
      payload = event.currentTarget.value
    }
		setDicePayload({
			...dicePayload,
			[event.currentTarget.name]: parseInt(payload)
		})
	}

	const checkCharacter = event => {
		event.preventDefault()
		if (catchErrors()) {
      if (selectedRole.reaction_bonus == "Special") {
        props.setFormPayload({
          ...props.formPayload,
          ...dicePayload,
          combat: combat,
          [aspectBonusesAssignable.at(0)]: 2,
          [aspectBonusesAssignable.at(1)]: 2,
          grit_bonus: 2,
          reflexes_bonus: 2,
          resolve_bonus: 2
        })
      } else {
        let reactionAssignable
        if (selectedRole.reaction_bonus == "Grit") {
          reactionAssignable = "grit_bonus"
        } else if (selectedRole.reaction_bonus == "Reflexes") {
          reactionAssignable = "reflexes_bonus"
        } else if (selectedRole.reaction_bonus == "Resolve") {
          reactionAssignable = "resolve_bonus"
        }
        props.setFormPayload({
          ...props.formPayload,
          ...dicePayload,
          combat: combat,
          [aspectBonusesAssignable.at(0)]: 2,
          [aspectBonusesAssignable.at(1)]: 2,
          [reactionAssignable]: 2
        })
      }
      setErrors(false)
      setSubmittable(true)
		} else {
			setErrors(true)
		}
	}

  const stepBackward = event => {
    props.setCurrentStep(props.currentStep - 1)
	}

  const assignBonus = event => {
    let payload = event.currentTarget.id
    let newSet
    if (aspectBonusesAssignable.length < 2 ) {
      newSet = aspectBonusesAssignable.concat([payload])
    } else {
      newSet = [aspectBonusesAssignable.at(-1), payload]
    }
    setAspectBonusesAssignable(newSet)
  }

	const catchErrors = () => {
    let traits = [dicePayload.physique, dicePayload.motor, dicePayload.social, dicePayload.reason, dicePayload.wits].sort(function(a, b){return b - a})
    let correctA = [12, 10, 8, 6, 6]
    let correctB = [12, 10, 8, 8, 4]
    if (JSON.stringify(traits) !== JSON.stringify(correctA) && JSON.stringify(traits) !== JSON.stringify(correctB)) {
      return false
    }

    let aspects = [dicePayload.athletic, dicePayload.convincing, dicePayload.expressive, dicePayload.graceful, dicePayload.intuitive, dicePayload.perceptive, dicePayload.rugged, dicePayload.studious, dicePayload.subtle, dicePayload.tactile].sort(function(a, b){return b - a})
    let correct = [10, 8, 8, 8, 8, 8, 6, 6, 6, 4]
    if (JSON.stringify(aspects) !== JSON.stringify(correct)) {
      return false
    }

    let reactions = [dicePayload.grit, dicePayload.reflexes, dicePayload.resolve].sort(function(a, b){return b - a})
    correct = [8, 8, 6]
    if (JSON.stringify(reactions) !== JSON.stringify(correct)) {
      return false
    }

    if(aspectBonusesAssignable.length !== 2) {
      return false
    }

    return true
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="callout horizons-body-font error-bar" >
				Double check to make sure all dice and bonuses are assigned correctly!
			</div>
		)
	}

  const diceArray = [12, 10, 8, 6, 4]

  const diceOptions = diceArray.map(die => {
    return (
      <option value={die}> {`d${die}`} </option>
    )
  })

  let i = -1
  const aspectBonuses = selectedCulture.aspect_bonus_options.map(option => {
    i++
    let assignable = selectedCulture.aspect_bonus_assignable.at(i)
    let chosen = false
    if (aspectBonusesAssignable.includes(assignable)) {
      chosen = true
    }
    return (
      <AspectBonusClickable
        chosen={chosen}
        assignable={assignable}
        assignBonus={assignBonus}
        option={option}
      />
    )
  })

  const submitCharacter = () => {
    props.finalizeCharacter()
  }

  let submitButton
  if (submittable) {
    submitButton =(
      <div onClick={submitCharacter} className="button horizons-body-font bold"> Submit Your Character <FontAwesomeIcon className="nav-arrow" icon="fa-solid fa-check" /> </div>
    )
  } else {
    submitButton = (
      <div onClick={checkCharacter} className="button horizons-body-font bold final-button"> Check Dice </div>
    )
  }

  let reactionBonus
	if (selectedRole.reaction_bonus == "Special") {
		reactionBonus = "all your reaction dice"
	} else {
		reactionBonus = `your ${props.reaction_bonus} die`
	}

	return (
		<div >			
			<form className="form-section" onSubmit={submitCharacter}>
        <div className="die-form-section">
          <div className="text-center">
            <h3 className="horizons-body-font"> Trait Dice: </h3>
            <span className="horizons-body-font"> Your <strong>Trait</strong> dice are your physical and mental attributes. Assign dice below to match one of the following dice arrays. </span>
          </div>
          <div className="horizons-body-font dice-array"> {`[ d12, d10, d8, d6, d6 ]  or  [ d12, d10, d8, d8, d4 ]`} </div>
          

          <div className="grid-x grid-margin-x trait-dice-selection">
            <div className="cell small-6 medium-auto text-center">  
              <label className="horizons-body-font die-label">
                Physique:
                <select 
                  id="physique"
                  name="physique"
                  value={dicePayload.physique} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  {diceOptions}
                </select>
              </label>
            </div>

            <div className="cell small-6 medium-auto text-center">  
              <label className="horizons-body-font die-label">
                Motor Skills:
                <select 
                  id="motor"
                  name="motor"
                  value={dicePayload.motor} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  {diceOptions}
                </select>
              </label>
            </div>

            <div className="cell small-4 medium-auto text-center">  
              <label className="horizons-body-font die-label">
                Social Skills:
                <select 
                  id="social"
                  name="social"
                  value={dicePayload.social} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  {diceOptions}
                </select>
              </label>
            </div>

            <div className="cell small-4 medium-auto text-center">  
              <label className="horizons-body-font die-label">
                Reason:
                <select 
                  id="reason"
                  name="reason"
                  value={dicePayload.reason} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  {diceOptions}
                </select>
              </label>
            </div>

            <div className="cell small-4 medium-auto text-center">  
              <label className="horizons-body-font die-label">
                Wits:
                <select 
                  id="wits"
                  name="wits"
                  value={dicePayload.wits} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  {diceOptions}
                </select>
              </label>
            </div>
          </div>
        </div>
				
				<div>
          <div className="die-form-section">
            <div className="text-center">
              <h3 className="horizons-body-font"> Aspect Dice: </h3>
              <span className="horizons-body-font"> Your <i>Aspect</i> dice are qualities of your character, how they act, and how approach problems. Assign dice below to match the following dice array. </span>
            </div>
            <div className="horizons-body-font dice-array"> {`[`} d10 &nbsp; d8, d8, d8, d8, d8 &nbsp; d6, d6, d6 &nbsp; d4 {`]`}  </div>

            <div className="grid-x grid-margin-x aspect-dice-selection">
              <div className="cell small-6 medium-auto  text-center">  
                <label className="horizons-body-font die-label">
                  Athletic:
                  <select 
                    id="athletic"
                    name="athletic"
                    value={dicePayload.athletic} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-6 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Convincing:
                  <select 
                    id="convincing"
                    name="convincing"
                    value={dicePayload.convincing} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-4 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Expressive:
                  <select 
                    id="expressive"
                    name="expressive"
                    value={dicePayload.expressive} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-4 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Graceful:
                  <select 
                    id="graceful"
                    name="graceful"
                    value={dicePayload.graceful} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-4 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Intuitive:
                  <select 
                    id="intuitive"
                    name="intuitive"
                    value={dicePayload.intuitive} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>
            
            </div>
            <div className="grid-x grid-margin-x" >

              <div className="cell small-6 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Perceptive:
                  <select 
                    id="perceptive"
                    name="perceptive"
                    value={dicePayload.perceptive} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-6 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Rugged:
                  <select 
                    id="rugged"
                    name="rugged"
                    value={dicePayload.rugged} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-4 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Studious:
                  <select 
                    id="studious"
                    name="studious"
                    value={dicePayload.studious} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-4 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Subtle:
                  <select 
                    id="subtle"
                    name="subtle"
                    value={dicePayload.subtle} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>

              <div className="cell small-4 medium-auto text-center">  
                <label className="horizons-body-font die-label">
                  Tactile:
                  <select 
                    id="tactile"
                    name="tactile"
                    value={dicePayload.tactile} 
                    onChange={changeHandler}
                  >
                    <option value="" ></option>
                    {diceOptions}
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="text-center die-form-section">
            <span className="horizons-body-font" > Additionally, click on two of the following <i>Aspects</i> from your <strong> Culture </strong>. Those dice will be <strong>raised one level each.</strong> </span>
            <div className="text-center die-form-section" >  
              <div className="grid-x grid-margin-x aspect-bonus-wrapper">
                {aspectBonuses}
              </div>
            </div>
          </div>
        </div>

        <div className="die-form-section">
          <div className="text-center">
            <h3 className="horizons-body-font"> Reaction Dice: </h3>
            <span className="horizons-body-font"> Your <i>Reaction</i> dice represent your character's ability to respond to situations by holding fast, reacting quickly, or maintaining control. Assign dice however you like from the array below. Additionally, because your character is in <strong>the {selectedRole.title}</strong> role, {reactionBonus} will be <strong>raised one level.</strong> </span>
          </div>

          <div className="horizons-body-font dice-array"> {`[ d8, d8, d6 ]`} </div>

          <div className="grid-x grid-margin-x reaction-dice-selection">
            <div className="cell auto text-center">  
              <label className="horizons-body-font die-label">
                Grit:
                <select 
                  id="grit"
                  name="grit"
                  value={dicePayload.grit} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  <option value={8}> {`d8`} </option>
                  <option value={6}> {`d6`} </option>
                </select>
              </label>
            </div>

            <div className="cell auto text-center">  
              <label className="horizons-body-font die-label">
                Reflexes:
                <select 
                  id="reflexes"
                  name="reflexes"
                  value={dicePayload.reflexes} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  <option value={8}> {`d8`} </option>
                  <option value={6}> {`d6`} </option>
                </select>
              </label>
            </div>

            <div className="cell auto text-center">  
              <label className="horizons-body-font die-label">
                Resolve:
                <select 
                  id="resolve"
                  name="resolve"
                  value={dicePayload.resolve} 
                  onChange={changeHandler}
                >
                  <option value="" ></option>
                  <option value={8}> {`d8`} </option>reflexes
                  <option value={6}> {`d6`} </option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="die-form-section">
          <div className="text-center">
            <h3 className="horizons-body-font"> What's Next? </h3>
            <span className="horizons-body-font"> 
              Provided everything is in order, <i>Horizons</i> will use your dice and any taken benefits to calculate the rest of your stats automatically. Once your character page is created, you can add backstory and images to accompany your character sheet however you like, and will be able to keep track of your resources on the fly.
            </span>

            <div className="text-center die-form-section">
              {submitButton}
            </div>
            {errorBar}
          </div>
      </div>

			</form>
			
      <div className="navigation-arrows grid-x grid-margin-x" >

        <div className="cell auto text-left horizons-body-font">
          <span onClick={stepBackward} className="bold nav-arrow-text edit-toggle"> 
            <FontAwesomeIcon className="nav-arrow" icon="fa-solid fa-arrow-left" />
            &nbsp; Previous
          </span>
        </div>       

      </div>
		</div>
	)
}

export default DiceForm