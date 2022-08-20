import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CharacterDisplay from "./CharacterDisplay"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { set } from "lodash"

library.add(faPlus)

const CharacterLibrary = (props) => {
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchCharacters()
	}, [])

	const fetchCharacters = async () => {
		try {
			const response = await fetch("/api/v1/characters")
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`
				const error = new Error (errorMessage)
				throw(error)
			}
			const charactersObject = await response.json()
			setCharacters(charactersObject.characters)
			setLoading(false)
		} catch (error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}
	
	return (
		<div>
			<div className="roster-header">
				<h2 className="horizons-title-font"> Character Roster </h2>
				<Link to={"/characters/new"} className="button bold horizons-body-font" >
					<FontAwesomeIcon icon="fa-solid fa-plus" />
					&nbsp;New Character 
					</Link>
			</div>
			<CharacterDisplay characters={characters} loading={loading} />
		</div>
	)
}

export default CharacterLibrary