import React, { useEffect, useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faBolt, faBandage } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart, faBolt, faBandage);


const ResourcesBar = props => {
	let [expanded, setExpanded] = useState(false)
	let [editPayload, setEditPayload] = useState({})

	useEffect(() => {
		setEditPayload({
			current_health: props.current_resources.health,
			current_vitality: props.current_resources.vitality,
			current_stress: props.current_resources.stress,
			current_rest_pool: props.current_resources.rest_die_pool
		})
	})
	const toggleExpanded = (event) => {
		if (expanded) {
			setExpanded(false)
		} else {
			setExpanded(true)
		}
	}

	let section
	if (expanded) {
		section = (
			<div onClick={toggleExpanded} className="grid-x callout landing-page-tile char-sheet-element" >
				<div className="cell small-4 text-center health-box">
					{props.current_resources.health}&nbsp;/&nbsp;{props.resources.health} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-heart" />
				</div>

				<div className="cell small-4 text-center stress-box">
					{props.current_resources.stress}&nbsp;/&nbsp;{props.resources.willpower} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-bolt" />
				</div>

				<div className="cell small-4 text-center rest-pool-box">
					{props.current_resources.rest_die_pool}&nbsp;/&nbsp;{props.resources.rest_die_pool} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-bandage" />
				</div>
			</div>
		)
	}	else {
		section = (
			<div onClick={toggleExpanded} className="grid-x callout landing-page-tile char-sheet-element">
				<div className="cell small-4 text-center health-box">
					{props.current_resources.health}&nbsp;/&nbsp;{props.resources.health} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-heart" />
				</div>

				<div className="cell small-4 text-center stress-box">
					{props.current_resources.stress}&nbsp;/&nbsp;{props.resources.willpower} &nbsp;
					<FontAwesomeIcon icon="fa-solid fa-bolt" />
				</div>

				<div className="cell small-4 text-center rest-pool-box">
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