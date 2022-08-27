import React from "react"
import { Link } from "react-router-dom"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faBolt, faBandage, faPersonRays, faPersonRunning, faHandshakeAngle, faLightbulb, faEye  } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart, faBolt, faBandage, faPersonRays, faPersonRunning, faHandshakeAngle, faLightbulb, faEye);

const CharacterTile = props => {

	let image
	if (!props.character.image.url) {
		image = "https://thearrivalstore.com/wp-content/uploads/2016/04/default_user_icon.jpg"
	} else {
		image = props.character.image.url
	}

	return (
		<div className="landing-page-tile callout cell medium-12 large-6 grid-container character-card-wrapper" >
			<Link to={`/characters/${props.character.id}`} className="horizons-body-font text-center">
				<div className="grid-x grid-margin-x character-card-tile" >
					<div className="cell small-12 medium-5 character-card-image-wrapper">
						<img src={image} className="character-card-image"/>
					</div>
					<div className="cell small-12 medium-7 character-card-text-wrapper">
						<h4 className="horizons-title-font card-header bold" >{props.character.name}</h4>
						<h5 className="horizons-body-font subtitle" > {`the ${props.character.role.title}`} </h5>
						<div className="grid-x">
							<div className="cell small-2 large-6 trait-die-box">
								<FontAwesomeIcon icon="fa-solid fa-person-rays" /> &nbsp;d{props.character.trait_dice.physique}
							</div>
							<div className="cell small-2 large-6 trait-die-box">
								<FontAwesomeIcon icon="fa-solid fa-person-running" /> &nbsp;d{props.character.trait_dice.motor}
							</div>
							<div className="cell small-2 large-4 trait-die-box">
								<FontAwesomeIcon icon="fa-solid fa-handshake-angle" /> &nbsp;d{props.character.trait_dice.social}
							</div>
							<div className="cell small-2 large-4 trait-die-box">
								<FontAwesomeIcon icon="fa-solid fa-lightbulb" /> &nbsp;d{props.character.trait_dice.reason}
							</div>
							<div className="cell small-2 large-4 trait-die-box">
								<FontAwesomeIcon icon="fa-solid fa-eye" /> &nbsp;d{props.character.trait_dice.wits}
							</div>
						</div>
						<div className="grid-x" >
							<div className="cell small-4 text-center health-box">
								{props.character.current_resources.health}&nbsp;/&nbsp;{props.character.resources.health} &nbsp;
								<FontAwesomeIcon icon="fa-solid fa-heart" />
							</div>
							<div className="cell small-4 text-center stress-box">
								{props.character.current_resources.stress}&nbsp;/&nbsp;{props.character.resources.willpower} &nbsp;
								<FontAwesomeIcon icon="fa-solid fa-bolt" />
							</div>
							<div className="cell small-4 text-center rest-pool-box">
								{props.character.current_resources.rest_die_pool}&nbsp;/&nbsp;{props.character.resources.rest_die_pool} &nbsp;
								<FontAwesomeIcon icon="fa-solid fa-bandage" />
							</div>
						</div>
						<div className="level-badge" > {props.character.leveling_info.level} </div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default CharacterTile