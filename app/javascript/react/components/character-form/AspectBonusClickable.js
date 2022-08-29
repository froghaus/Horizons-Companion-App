import React, { useState, useEffect } from "react"

const AspectBonusClickable = props => {
  const [chosen, setChosen] = useState(false)

	useEffect(() => {
		setChosen(props.chosen)
	}, [props.chosen])

  let selectButton
  if (chosen) {
    selectButton =(
      <div id={props.assignable} className="button alert bold horizons-body-font skill-select-button">
        {props.option}
      </div>
    )
  } else {
    selectButton = (
      <div id={props.assignable} onClick={props.assignBonus} className="button bold horizons-body-font skill-select-button select-button">
        {props.option}
      </div>
    )
  }

  return (
    <div className="cell auto text-center">
      {selectButton}
    </div>

  )
}

export default AspectBonusClickable