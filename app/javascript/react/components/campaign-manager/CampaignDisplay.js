import React, { Fragment, useState } from "react"
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
			if (props.type == "owner" ) {
				campaignTiles = (
					<div className="horizons-body-font warning-text"> You haven't started any campaigns yet! </div>
				)
			} else {
				campaignTiles = (
					<div className="horizons-body-font warning-text"> You aren't playing in any campaigns yet! </div>
				)
			}
		}
	}

	return (
		<Fragment>
			<div className="campaign-section-header" >
				<h3 className="horizons-body-font campaign-section-header-text" > {props.type}</h3>
				<hr className="row-splitter" />
			</div>
			<div className="grid-container">
				<div className="grid-x grid-margin-x">
					{campaignTiles}
				</div>
			</div>
		</Fragment>
	)
}

export default CampaignDisplay