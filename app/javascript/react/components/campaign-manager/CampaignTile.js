import React from "react"
import { Link } from "react-router-dom"

const CampaignTile = props => {

	return (
		<Link to={`/campaigns/${props.id}`} className="cell landing-page-tile callout small-12 character-card-wrapper text-center" >
			<div className="character-card-text-wrapper" >
				<h3 className="horizons-title-font" > {props.title} </h3>
				<span className="horizons-body-font" > {props.description} </span>
			</div>
		</Link>
	)
}

export default CampaignTile