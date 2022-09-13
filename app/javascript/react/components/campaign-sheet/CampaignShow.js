import React, { Fragment, useEffect, useState } from "react"

const CampaignShow = props => {
    const [campaign, setCampaign] = useState({})
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
			setCampaign(campaignObject)
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
		campaignSheet = (
			<div> successfully loaded </div>
			//campaign sheet component
		)
	}

	return(
		<Fragment> 
			{campaignSheet}
		</Fragment>
	)
}

export default CampaignShow