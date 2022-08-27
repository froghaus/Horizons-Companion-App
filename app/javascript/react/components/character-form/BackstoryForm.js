import React, { useState, useEffect } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import BackstoryCard from "../character-sheet/BackstoryCard"

library.add(faArrowLeft, faArrowRight)

const BackstoryForm = props => {
	const [errors, setErrors] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

	const passionChangeHandler = (event) => {
    props.setFormPayload({
      ...props.formPayload,
      passion_id: event.currentTarget.id
    })
	}

  const misfortuneChangeHandler = (event) => {
    let payload
    if (event.currentTarget.id == props.formPayload.misfortune_id) {
      payload = false
    } else {
      payload = event.currentTarget.id
    }
    props.setFormPayload({
      ...props.formPayload,
      misfortune_id: payload
    })
	}

  const anxietyChangeHandler = (event) => {
    let payload
    if (event.currentTarget.id == props.formPayload.anxiety_id) {
      payload = false
    } else {
      payload = event.currentTarget.id
    }
    props.setFormPayload({
      ...props.formPayload,
      anxiety_id: payload
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
		if (props.formPayload.passion_id == null) {
			return false
		} else {
			return true
		}
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="callout horizons-body-font error-bar" >
				You must select at least one <strong>Passion!</strong>
			</div>
		)
	}

  const passions = props.passions.map( element => {
    let selected = false
    if (element.id == props.formPayload.passion_id) {
      selected = true
    }
    return (
      <BackstoryCard
        selected={selected}
        selecting={passionChangeHandler}
        key={element.id}
        id={element.id}
        type={"Passion"}
        title={element.title}
        passive={element.passive}
        trigger={element.trigger}
        flavor_text={element.flavor_text}
      />
    )
  })

	const passionsSection = (
    <div className="cell small-12 selection-section taller" >
      <div >
        <h6 className="horizons-title-font bold selection-section-header"> Passions </h6>
        <hr className="row-splitter" />
      </div>
      <div className="grid-x grid-margin-x selection-body more-space">
        {passions}
      </div>
    </div>
  )

  const misfortunes = props.misfortunes.map( element => {
    let selected = false
    if (element.id == props.formPayload.misfortune_id) {
      selected = true
    }
    return (
      <BackstoryCard
        selected={selected}
        selecting={misfortuneChangeHandler}
        key={element.id}
        id={element.id}
        type={"Misfortune"}
        title={element.title}
        passive={element.passive}
        trigger={element.trigger}
        flavor_text={element.flavor_text}
      />
    )
  })

	const misfortunesSection = (
    <div className="cell small-12 selection-section taller" >
      <div >
        <h6 className="horizons-title-font bold selection-section-header"> Misfortunes </h6>
        <hr className="row-splitter" />
      </div>
      <div className="grid-x grid-margin-x selection-body more-space">
        {misfortunes}
      </div>
    </div>
  )

  const anxieties = props.anxieties.map( element => {
    let selected = false
    if (element.id == props.formPayload.anxiety_id) {
      selected = true
    }
    return (
      <BackstoryCard
        selected={selected}
        selecting={anxietyChangeHandler}
        key={element.id}
        id={element.id}
        type={"Anxiety"}
        title={element.title}
        passive={element.passive}
        trigger={element.trigger}
        flavor_text={element.flavor_text}
      />
    )
  })

	const anxietiesSection = (
    <div className="cell small-12 selection-section taller" >
      <div >
        <h6 className="horizons-title-font bold selection-section-header"> Anxieties </h6>
        <hr className="row-splitter" />
      </div>
      <div className="grid-x grid-margin-x selection-body more-space">
        {anxieties}
      </div>
    </div>
  )

	return (
		<div >
			<h3 className="horizons-body-font" > Strengths and Weaknesses </h3>
			<span className="horizons-body-font"> 
        Let's flesh out your character and their backstory a bit. <strong> Passions </strong> are abilities which grant passive effects and can help you relieve <strong> stress. </strong>
        In contrast, <strong> Misfortunes </strong> and <strong> Anxieties </strong> will hamper your character with weaknesses which build up <strong> stress </strong> or force <strong> disadvantage </strong> on rolls at inopportune times. However, for each one you take, you get a new <strong>growth</strong> opportunity tied to their trigger.
        <br/>
      </span>

      <span className="horizons-body-font" > 
        &nbsp; Choose <strong> at least one Passion</strong> before you continue. You can also <strong><i>choose</i></strong> to take up to one <strong>Misfortune</strong> and up to one <strong>Anxiety</strong>. Once you've made your selections, click "next" at the bottom to continue.
      </span>
			
			{passionsSection}
      {misfortunesSection}
      {anxietiesSection}
			
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

export default BackstoryForm