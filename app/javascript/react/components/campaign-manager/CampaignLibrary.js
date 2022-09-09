import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import CampaignDisplay from "./CampaignDisplay"

library.add(faPlus)

const CampaignLibrary = props => {
  const [campaigns, setCampaigns] = useState({
		owner: [],
		player: []
	})
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		fetchCampaigns()
	}, [])

	const fetchCampaigns = async () => {
		try {
			const response = await fetch("/api/v1/campaigns")
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`
				const error = new Error (errorMessage)
				throw(error)
			}
			const campaignsObject = await response.json()
			setCampaigns(campaignsObject)
			setLoading(false)
		} catch (error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}

	return (
		<div>
			<div className="roster-header">
				<h2 className="horizons-title-font"> Your Campaigns </h2>
				<Link to={"/campaigns/new"} className="button bold horizons-body-font" >
					<FontAwesomeIcon icon="fa-solid fa-plus" />
					&nbsp; Start a Campaign 
				</Link>
			</div>
			<CampaignDisplay campaigns={campaigns.owner} loading={loading} type="Owner" />
			<CampaignDisplay campaigns={campaigns.player} loading={loading} type="Player" />
		</div>
	)
}

export default CampaignLibrary