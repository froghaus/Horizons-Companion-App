import React, { useState } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPersonRays, faPersonRunning, faHandshakeAngle, faLightbulb, faEye  } from "@fortawesome/free-solid-svg-icons"

library.add(faPersonRays, faPersonRunning, faHandshakeAngle, faLightbulb, faEye)

const DiceBar = (props) => {
	const [expanded, setExpanded] = useState(true)

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
			<div onClick={toggleExpanded} className="callout landing-page-tile char-sheet-element grid-x grid-margin-x unexpanded" >
				<div className="cell small-8 medium-4 large-3 trait-dice-section">
					<div className="grid-x trait-die-unit" >
						<div className="cell small-7 horizons-body-font text-right physique trait-die-title-bar">
							Physique
						</div>
						<div className="cell small-2 text-center trait-icon">
							<FontAwesomeIcon icon="fa-solid fa-person-rays" />
						</div>
						<div className="cell small-3 horizons-body-font text-center trait-die-badge">
							<span> d{props.trait_dice.physique} </span> 
						</div>
					</div>

					<div className="grid-x trait-die-unit" >
						<div className="cell small-7 horizons-body-font text-right motor trait-die-title-bar">
							Motor Skills 
						</div>
						<div className="cell small-2 text-center trait-icon">
							<FontAwesomeIcon icon="fa-solid fa-person-running" />
						</div>
						<div className="cell small-3 horizons-body-font text-center trait-die-badge">
							<span> d{props.trait_dice.motor} </span> 
						</div>
					</div>
					
					<div className="grid-x trait-die-unit" >
						<div className="cell small-7 horizons-body-font text-right social trait-die-title-bar">
							Social Skills
						</div>
						<div className="cell small-2 text-center trait-icon">
							<FontAwesomeIcon icon="fa-solid fa-handshake-angle" />
						</div>
						<div className="cell small-3 horizons-body-font text-center trait-die-badge">
							<span> d{props.trait_dice.social} </span> 
						</div>
					</div>

					<div className="grid-x trait-die-unit" >
						<div className="cell small-7 horizons-body-font text-right reason trait-die-title-bar">
							Reason
						</div>
						<div className="cell small-2 text-center trait-icon">
							<FontAwesomeIcon icon="fa-solid fa-lightbulb" />
						</div>
						<div className="cell small-3 horizons-body-font text-center trait-die-badge">
							<span> d{props.trait_dice.reason} </span> 
						</div>
					</div>

					<div className="grid-x trait-die-unit" >
						<div className="cell small-7 horizons-body-font text-right wits trait-die-title-bar">
							Wits
						</div>
						<div className="cell small-2 text-center trait-icon">
							<FontAwesomeIcon icon="fa-solid fa-eye" />
						</div>
						<div className="cell small-3 horizons-body-font text-center trait-die-badge">
							<span> d{props.trait_dice.wits} </span> 
						</div>
					</div>
				</div>

				<div className="cell small-4 medium-2 large-2">
					<div className="grid-x grid-margin-x reaction-die-section" >

						<div className="cell small-12 grid-x">
							<div className="cell small-12 horizons-body-font text-center bold">
								Grit
							</div>
							<div className="cell small-12 horizons-body-font text-center reaction-die-badge">
								<span> d{props.reaction_dice.grit} </span> 
							</div>
						</div>

						<div className="cell small-12 grid-x text-center reaction-die-unit">
							<div className="cell small-12 horizons-body-font text-center bold">
								Reflexes
							</div>
							<div className="cell small-12 horizons-body-font text-center reaction-die-badge">
								<span> d{props.reaction_dice.reflexes} </span> 
							</div>
						</div>

						<div className="cell small-12 grid-x">
							<div className="cell small-12 horizons-body-font text-center bold">
								Resolve
							</div>
							<div className="cell small-12 horizons-body-font text-center reaction-die-badge">
								<span> d{props.reaction_dice.resolve} </span> 
							</div>
						</div>

					</div>
				</div>

				<div className="cell small-12 medium-6 large-7" >
					<div className="grid-x grid-margin-x" >

						<div className="cell small-6" >

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar odd-one" >
									Athletic
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center odd-two" >
									d{props.aspect_dice.athletic}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar even-one" >
									Convincing
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center even-two" >
									d{props.aspect_dice.convincing}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar odd-one" >
									Expressive
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center odd-two" >
									d{props.aspect_dice.expressive}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar even-one" >
									Graceful
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center even-two" >
									d{props.aspect_dice.graceful}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar odd-one" >
									Intuitive
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center odd-two" >
									d{props.aspect_dice.intuitive}
								</div>
							</div>

						</div>

						<div className="cell small-6" >

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar odd-one" >
									Perceptive
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center odd-two" >
									d{props.aspect_dice.perceptive}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar even-one" >
									Rugged
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center even-two" >
									d{props.aspect_dice.rugged}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar odd-one" >
									Studious
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center odd-two" >
									d{props.aspect_dice.studious}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar even-one" >
									Subtle
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center even-two" >
									d{props.aspect_dice.subtle}
								</div>
							</div>

							<div className="grid-x aspect-die-unit">
								<div className="cell small-9 medium-8 large-9 horizons-body-font aspect-die-title-bar odd-one" >
									Tactile
								</div>
								<div className="cell small-3 medium-4 large-3 horizons-body-font aspect-die-badge text-center odd-two" >
									d{props.aspect_dice.tactile}
								</div>
							</div>

						</div>

					</div>
				</div>
			</div>
		)
	} else {
		section = (
			<div onClick={toggleExpanded} className="callout landing-page-tile char-sheet-element unexpanded text-center" >
				<div className="grid-x unexpanded-dice-section">
					<div className="cell small-2 trait-die-box trait-die-badge text-center">
						<FontAwesomeIcon icon="fa-person-rays" /> d{props.trait_dice.physique}
					</div>
					<div className="cell small-2 trait-die-box trait-die-badge text-center">
						<FontAwesomeIcon icon="fa-person-running" /> d{props.trait_dice.motor}
					</div>
					<div className="cell small-2 trait-die-box trait-die-badge text-center">
						<FontAwesomeIcon icon="fa-handshake-angle" /> d{props.trait_dice.social}
					</div>
					<div className="cell small-2 trait-die-box trait-die-badge text-center">
						<FontAwesomeIcon icon="fa-lightbulb" /> d{props.trait_dice.reason}
					</div>
					<div className="cell small-2 trait-die-box trait-die-badge text-center">
						<FontAwesomeIcon icon="fa-solid fa-eye" /> d{props.trait_dice.wits}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div >
			{section}
		</div>
	)
}

export default DiceBar