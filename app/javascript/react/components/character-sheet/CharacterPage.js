import React, { useEffect, useState } from "react"
import PersonalityBar from "./PersonalityBar"
import ResourcesBar from "./ResourcesBar"
import DiceBar from "./DiceBar"

import _ from "lodash"

const CharacterPage = props => {
	const [character, setCharacter] = useState({})

	const fetchCharacter = async () => {
		try {
			const response = await fetch(`/api/v1/characters/${props.match.params.id}`)
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`
				const error = new Error (errorMessage)
				throw(error)
			}
			const characterObject = await response.json()
			setCharacter(characterObject.character)
		} catch (error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}

	const updateCharacter = async (payload) => {
		try {
			const response = await fetch(`/api/v1/characters/${character.id}`, {
				credentials: "same-origin",
				method: "PATCH",
				body: payload
			})
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.status.text})`
				const error = new Error(errorMessage)
				throw(error)
			}
			const characterObject = await response.json()
			setCharacter(characterObject.character)
		} catch(error) {
			console.log(`Error in fetch: ${error}`)
		}
	}

	useEffect(() => {
		fetchCharacter()
	}, [])

	if (_.isEmpty(character)) {
		return null
	}

	let image
	if (!character.image.url) {
		image = { url: "https://thearrivalstore.com/wp-content/uploads/2016/04/default_user_icon.jpg" }
	} else {
		image = character.image
	}

	return (
		<div> 
			<PersonalityBar 
				character={character}
				updateCharacter={updateCharacter}
				setCharacter={setCharacter}
				image={image}
				text_info={character.text_info} 
				role={character.role} 
				name={character.name}
				leveling_info={character.leveling_info}
				misfortunes={character.misfortunes}
				anxieties={character.anxieties}
			/>
			<ResourcesBar 
				resources={character.resources}
				current_resources={character.current_resources}
				updateCharacter={updateCharacter}
				character={character}
			/>
			<DiceBar
				character={character}
				trait_dice={character.trait_dice}
				aspect_dice={character.aspect_dice}
				reaction_dice={character.reaction_dice}
				speed={character.speed}
				combat={character.role.combat_die}
			/>
		</div>
	)
}

export default CharacterPage