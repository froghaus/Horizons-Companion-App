import React, { useEffect, useState } from "react"
import AboutSection from "./AboutSection"

const CampaignSheet = props => {
	const [editPayload, setEditPayload] = useState({ description: "" })

	useEffect(() => {
		setEditPayload({ description: props.campaign.description })
	}, [])

	const handleChange = event => {
		setEditPayload ({
      ...editPayload,
			[event.currentTarget.name]: event.currentTarget.value
    })
	}

	const handleFormSubmit = event => {
		event.preventDefault()
		let payload = new FormData()
		if (editPayload.image) {
			payload.append("image", editPayload.image)
		}
		payload.append("description", editPayload.description)

		props.updateCampaign(payload)
	}

	return (
		<div className="grid-container" >
			<div className="grid-x grid-margin-x" >
				<div className="cell small-12 medium-5 large-4" >
					<AboutSection
						 description={props.campaign.description}
						 owner={props.owner}
						 editPayload={editPayload}
						 handleChange={handleChange}
						 handleFormSubmit={handleFormSubmit}
					/>
					<div> Player Names will go here </div>
				</div>

				<div className="cell auto" > Player Character Tiles will go here </div>
			</div>
		</div>
	)
}

export default CampaignSheet