import React, { useEffect, useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import KnackCard from '../character-sheet/KnackCard.js'

library.add(faArrowLeft, faArrowRight)

const CultureOptionsForm = props => {
	const [errors, setErrors] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const selectedCulture = props.cultures.filter(culture => culture.id == props.formPayload.culture_id).at(0)

	const knackChangeHandler = (event) => {
    props.setFormPayload({
      ...props.formPayload,
      culture_knack: event.currentTarget.id
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
		if (props.formPayload.culture_knack == null) {
			return false
		} else {
			return true
		}
	}

	let errorBar
	if (errors) {
		errorBar = (
			<div className="callout horizons-body-font error-bar" >
				You still have unselected <strong>Knacks!</strong>
			</div>
		)
	}

  const knacks = selectedCulture.knacks.map( knack => {
    let selected = false
    if (knack.id == props.formPayload.culture_knack) {
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


	return (
		<div >
			<h3 className="horizons-body-font" > What did you learn? </h3>
			<span className="horizons-body-font"> 
        More starting gifts from your culture! You can select <strong> one of the following Knacks </strong> to take at level 0. Then click "next" at the bottom when you're done.
      </span>
			
			{knacksSection}
			
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

export default CultureOptionsForm