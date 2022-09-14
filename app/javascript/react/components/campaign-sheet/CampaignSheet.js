import React, { useEffect, useState } from "react"

const CampaignSheet = props => {
	if (props.owner) {
		console.log("chumby")
	}

	return (
		<div className="grid-container" >
			<div className="grid-x grid-margin-x" >
				<div className="cell small-12 medium-5 large-4 landing-page-tile" >
					<div>
						
					</div>
				</div>

				<div className="cell auto" > I'm cell 2! </div>
			</div>
		</div>
	)
}

export default CampaignSheet