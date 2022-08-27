import React, { useEffect, useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import KnackCard from '../character-sheet/KnackCard.js'
import SkillCard from '../character-sheet/SkillCard.js'

library.add(faArrowLeft, faArrowRight)

const RoleOptionsForm = props => {
	const [errors, setErrors] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const selectedRole = props.roles.filter(role => role.id == props.formPayload.role_id).at(0)

  let skillCap
  let skillCapText
  if (props.formPayload.role_id == 2 || props.formPayload.role_id == 5) {
    skillCap = 2
    skillCapText = "two"
  } else {
    skillCap = 1
    skillCapText = "one"
  }

  const skillChangeHandler = (event) => {
    let newSet
    if (props.formPayload.taken_skills.includes(event.currentTarget.id)) {
      newSet = props.formPayload.taken_skills.filter(skill => skill !== event.currentTarget.id)
    } else {
      if (skillCap == 2) {
        if (props.formPayload.taken_skills.length >= skillCap) {
          newSet = [props.formPayload.taken_skills.at(-1), event.currentTarget.id]
        } else {
          newSet = props.formPayload.taken_skills.concat([event.currentTarget.id])
        }
      } else {
        newSet = [event.currentTarget.id]
      }
    }
    props.setFormPayload({
      ...props.formPayload,
      taken_skills: newSet
    })
  }

	const knackChangeHandler = (event) => {
    props.setFormPayload({
      ...props.formPayload,
      role_knack: event.currentTarget.id
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
    props.setCurrentStep(props.currentStep - 1)
	}

	const catchErrors = () => {
		if (props.formPayload.culture_knack == "" || props.formPayload.taken_skills.length < skillCap) {
			return false
		} else {
			return true
		}
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="callout horizons-body-font error-bar" >
				You still have unselected <strong>Skills</strong> and/or <strong>Knacks!</strong>
			</div>
		)
	}

  const knacks = selectedRole.knacks.map( knack => {
    let selected = false
    if (knack.id == props.formPayload.role_knack) {
      selected = true
    }
    return (
      <KnackCard
        selected={selected}
        selecting={knackChangeHandler}
        key={knack.id}
        id={knack.id}
        title={knack.title}
        rules_text={knack.rules_text}
        options={knack.options}
      />
    )
  })

	const knacksSection = (
    <div className="cell small-12 selection-section" >
      <div >
        <h6 className="horizons-title-font bold selection-section-header"> Knacks </h6>
        <hr className="row-splitter" />
      </div>
      <div className="grid-x grid-margin-x selection-body">
        {knacks}
      </div>
    </div>
  )

  const skills = selectedRole.skill_options.map( skill => {
    let selected = false
    if (props.formPayload.taken_skills.includes(skill.id.toString())) {
      selected = true
    }
    return (
      <SkillCard
        selected={selected}
        selecting={skillChangeHandler}
        key={skill.id}
        id={skill.id}
        title={skill.title}
        action_type={skill.action_type}
        focus={skill.focus}
        trigger={skill.trigger}
        rules_text={skill.rules_text}
        options={skill.options}
      />
    )
  })

  const skillsSection = (
    <div className="cell small-12 selection-section" >
      <div >
        <h6 className="horizons-title-font bold selection-section-header"> Skills </h6>
        <hr className="row-splitter" />
      </div>
      <div className="grid-x grid-margin-x selection-body">
        {skills}
      </div>
    </div>
  )


	return (
		<div >
			<h3 className="horizons-body-font" > More for your toolbox </h3>
			<span className="horizons-body-font"> 
        Now let's choose your starting gifts! As a <strong> {selectedRole.title} </strong>level zero, you can select <strong> one of the following Knacks </strong> and <strong> {skillCapText} of the following Skills. </strong> Then click "next" at the bottom when you're done.
      </span>
			
			{knacksSection}
      {skillsSection}
			
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

export default RoleOptionsForm