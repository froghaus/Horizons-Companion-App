import React, { useEffect, useState } from "react"
import PersonalityBar from "./PersonalityBar"
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
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({character: payload})
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

	return (
		<div> 
			<PersonalityBar 
				character={character}
				updateCharacter={updateCharacter}
				setCharacter={setCharacter}
				// image={character.image.url}
				image={"https://cdn.discordapp.com/attachments/761240859190099978/763543956532625418/armorladycomm.png"}
				text_info={character.text_info} 
				role={character.role} 
				name={character.name}
				leveling_info={character.leveling_info}
				misfortunes={character.misfortunes}
				anxieties={character.anxieties}
			/>
		</div>
	)
}

export default CharacterPage