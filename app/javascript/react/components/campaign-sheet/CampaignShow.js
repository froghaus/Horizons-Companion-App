import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CampaignSheet from "./CampaignSheet"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

library.add(faArrowLeft)

const CampaignShow = props => {
    const [campaign, setCampaign] = useState({})
		const [currentUser, setCurrentUser] = useState({})
		const [loading, setLoading] = useState(true)
		const [error, setError] = useState(false)

    const fetchCampaign = async () => {
		try {
			const response = await fetch(`/api/v1/campaigns/${props.match.params.id}`)
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`
				const error = new Error (errorMessage)
				throw(error)
			}
			const campaignObject = await response.json()
			setCampaign(campaignObject.campaign)
			setCurrentUser(campaignObject.current_user)
			setLoading(false)
		} catch (error) {
			console.error(`Error in fetch: ${error.message}`)
			setLoading(false)
			setError(true)
		}
	}

	useEffect(() => {
		fetchCampaign()
	}, [])

	let campaignSheet
	if (loading) {
		campaignSheet = (
			<div className="horizons-body-font warning-text"> Loading... </div>
		)			
	} else if (error) {
		campaignSheet = (
			<div className="horizons-body-font warning-text"> No Campaign Found. </div>
		)
	} else {
		let owner = false
		if (campaign.user_id === currentUser.id) {
			owner = true
		}
		campaignSheet = (
			<div>
				<h2 className="horizons-title-font campaign-section-header-text" > {campaign.title} </h2>
				<CampaignSheet
					campaign={campaign}
					currentUser={currentUser}
					owner={owner}
				/>
			</div>
		)
	}

	return(
		<Fragment>
			<Link to={"/campaigns"} className="nav-arrow-text edit-toggle horizons-body-font" > 
				<FontAwesomeIcon className="nav-arrow" icon="fa-solid fa-arrow-left" /> &nbsp; Back to Your Campaigns
			</Link>
			{campaignSheet}
		</Fragment>
	)
}

export default CampaignShow