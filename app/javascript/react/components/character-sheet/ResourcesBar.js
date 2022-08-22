import React, { useEffect, useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faBolt, faBandage, faCaretDown, faCaretUp, faSkull, faHeartCrack } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart, faBolt, faBandage, faCaretDown, faCaretUp, faSkull, faHeartCrack);


const ResourcesBar = props => {
	const [expanded, setExpanded] = useState(false)
	const [editPayload, setEditPayload] = useState({})

	useEffect(() => {
		setEditPayload({
			current_health: props.current_resources.health,
			current_vitality: props.current_resources.vitality,
			current_stress: props.current_resources.stress,
			current_rest_pool: props.current_resources.rest_die_pool
		})
	}, [props.character])

	const toggleExpanded = (event) => {
		if (expanded) {
			setExpanded(false)
		} else {
			setExpanded(true)
		}
	}

	const healthUp = () => {
		if (editPayload.current_health + 1 <= props.resources.health) {
			setEditPayload ({
				...editPayload,
				current_health: (editPayload.current_health + 1)
			})
		}
	}

	const healthDown = () => {
		if (editPayload.current_health - 1 >= 0) {
			setEditPayload ({
				...editPayload,
				current_health: (editPayload.current_health - 1)
			})
		}
	}

	const vitalityUp = () => {
		if (editPayload.current_vitality + 1 <= 2) {
			setEditPayload ({
				...editPayload,
				current_vitality: (editPayload.current_vitality + 1)
			})
		}
	}

	const vitalityDown = () => {
		if (editPayload.current_vitality - 1 >= 0) {
			setEditPayload ({
				...editPayload,
				current_vitality: (editPayload.current_vitality - 1)
			})
		}
	}

	const stressUp = () => {
			setEditPayload ({
				...editPayload,
				current_stress: (editPayload.current_stress + 1)
			})
	}

	const stressDown = () => {
		if (editPayload.current_stress - 1 >= 0) {
			setEditPayload ({
				...editPayload,
				current_stress: (editPayload.current_stress - 1)
			})
		}
	}

	const restPoolUp = () => {
		if (editPayload.current_rest_pool + 1 <= props.resources.rest_die_pool) {
			setEditPayload ({
				...editPayload,
				current_rest_pool: (editPayload.current_rest_pool + 1)
			})
		}
	}

	const restPoolDown = () => {
		if (editPayload.current_rest_pool - 1 >= 0) {
			setEditPayload ({
				...editPayload,
				current_rest_pool: (editPayload.current_rest_pool - 1)
			})
		}
	}

	let vitalityIcons
	if (editPayload.current_vitality == 2) {
		vitalityIcons = (
			<span> 
				<FontAwesomeIcon icon="fa-solid fa-heart" className="full-heart" />
				&nbsp; &nbsp; 
				<FontAwesomeIcon icon="fa-solid fa-heart" className="full-heart" />
			</span>
		)
	} else if (editPayload.current_vitality == 1) {
		vitalityIcons = (
			<span> 
				<FontAwesomeIcon icon="fa-solid fa-heart" className="full-heart" />
				&nbsp; &nbsp; 
				<FontAwesomeIcon icon="fa-solid fa-heart-crack" className="cracked-heart" />
			</span>
		)
	} else {
		vitalityIcons = (
			<span> 
				<FontAwesomeIcon icon="fa-solid fa-heart-crack" className="cracked-heart" />
				&nbsp; &nbsp;
				<FontAwesomeIcon icon="fa-solid fa-heart-crack" className="cracked-heart" />
			</span>
		)
	}

	const saveHandler = () => {
		let payload = new FormData()
		payload.append("current_health", editPayload.current_health)
		payload.append("current_vitality", editPayload.current_vitality)
		payload.append("current_stress", editPayload.current_stress)
		payload.append("current_rest_pool", editPayload.current_rest_pool)

		props.updateCharacter(payload)
		toggleExpanded()
	}

	let section
	if (expanded) {
		section = (
			<div className="callout landing-page-tile char-sheet-element" >
				<div className="grid-x">
					<div className="cell small-12 medium-3 text-center health-box grid-x">
						<div className="cell small-12">
							<h4 className="horizons-body-font resource-box-title">
								Health &nbsp;
								<FontAwesomeIcon className="resource-icon" icon="fa-solid fa-heart" />
							</h4>
							<p className="horizons-body-font">  </p>
						</div>

						<div className="cell small-12 resource-box" >
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={healthUp} className="resource-arrow" /> </div>
							<span> {editPayload.current_health}&nbsp;/&nbsp;{props.resources.health} </span>
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={healthDown} className="resource-arrow" /> </div>
						</div>
					</div>

					<div className="cell small-12 medium-3 text-center vitality-box grid-x">
						<div className="cell small-12">
							<h4 className="horizons-body-font resource-box-title"> 
								Vitality &nbsp;
								<FontAwesomeIcon className="resource-icon" icon="fa-solid fa-skull" />
							</h4>
							<p className="horizons-body-font">  </p>
						</div>

						<div className="cell small-12 resource-box" >
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={vitalityUp} className="resource-arrow" /> </div>
							{vitalityIcons}
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={vitalityDown} className="resource-arrow" /> </div>
						</div>
					</div>

					<div className="cell small-12 medium-3 text-center stress-box grid-x">
						<div className="cell small-12">
							<h4 className="horizons-body-font resource-box-title"> 
								Stress &nbsp;
								<FontAwesomeIcon className="resource-icon" icon="fa-solid fa-bolt" />
							</h4>
							<p className="horizons-body-font">  </p>
						</div>

						<div className="cell small-12 resource-box" >
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={stressUp} className="resource-arrow" /> </div>
							<span> {editPayload.current_stress}&nbsp;/&nbsp;{props.resources.willpower} </span>
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={stressDown} className="resource-arrow" /> </div>
						</div>
					</div>

					<div className="cell small-12 medium-3 text-center rest-pool-box grid-x">
						<div className="cell small-12">
							<h4 className="horizons-body-font resource-box-title"> 
								Rest Pool &nbsp;
								<FontAwesomeIcon className="resource-icon" icon="fa-solid fa-bandage" />
							</h4>
							<p className="horizons-body-font">  </p>
						</div>

						<div className="cell small-12 resource-box" >
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-up" onClick={restPoolUp} className="resource-arrow" /> </div>
							<span> {editPayload.current_rest_pool}&nbsp;/&nbsp;{props.resources.rest_die_pool} </span>
							<div> <FontAwesomeIcon icon="fa-solid fa-caret-down" onClick={restPoolDown} className="resource-arrow" /> </div>
						</div>
					</div>
				</div>

				<br/>
				<div className="cell auto button bold horizons-body-text expanded" onClick={saveHandler} > {`Save & Hide`} </div>
			</div>
		)
	}	else {
		section = (
			<div onClick={toggleExpanded} className="grid-x callout landing-page-tile char-sheet-element">
				<div className="cell small-3 text-center health-box">
					{props.current_resources.health}&nbsp;/&nbsp;{props.resources.health} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-heart" />
				</div>

				<div className="cell small-3 text-center vitality-box">
					{vitalityIcons}
				</div>

				<div className="cell small-3 text-center stress-box">
					{props.current_resources.stress}&nbsp;/&nbsp;{props.resources.willpower} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-bolt" />
				</div>

				<div className="cell small-3 text-center rest-pool-box">
					{props.current_resources.rest_die_pool}&nbsp;/&nbsp;{props.resources.rest_die_pool} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-bandage" />
				</div>
			</div>
		)
	}

	return (
		<div>
			{section}
		</div>
	)
}

export default ResourcesBar