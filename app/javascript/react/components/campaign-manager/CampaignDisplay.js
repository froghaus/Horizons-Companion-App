import React from "react"
import CampaignTile from "./CampaignTile"

const CampaignDisplay = (props) => {

	let campaignTiles = props.campaigns.map(campaign => {
 		return ( <CampaignTile key={campaign.id} id={campaign.id} title={campaign.title} description={campaign.description} />)
	})

	if (!campaignTiles.length) {
		if (props.loading) {
			campaignTiles = (
				<div className="horizons-body-font warning-text"> Loading... </div>
			)
		} else {
			campaignTiles = (
				<div className="horizons-body-font warning-text"> You haven't started any campaigns yet! </div>
			)
		}
	}

	return (
		<div className="grid-container">
			<div className="grid-x grid-margin-x">
				{campaignTiles}
			</div>
		</div>
	)
}

export default CampaignDisplay