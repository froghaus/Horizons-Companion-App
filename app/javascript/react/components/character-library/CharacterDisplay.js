import React from "react"
import CharacterTile from "./CharacterTile"

const CharacterDisplay = (props) => {

	let characterTiles = props.characters.map(character => {
		return ( <CharacterTile key={character.id} character={character} /> )
	})

	if (!characterTiles.length) {
		if (props.loading) {
			characterTiles = (
				<div className="horizons-body-font warning-text"> Loading... </div>
			)
		} else {
			characterTiles = (
				<div className="horizons-body-font warning-text"> You don't have any characters yet! </div>
			)
		}
	}

	return (
		<div className="grid-container">
			<div className="grid-x grid-margin-x">
				{characterTiles}
			</div>
		</div>
	)
}

export default CharacterDisplay