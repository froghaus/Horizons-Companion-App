class Api::V1::CampaignsController < ApiController

	def index 
		render json: current_user.get_campaigns
	end

	def show
		render json: {campaign: Campaign.find(params[:id]), current_user: current_user}
	end

	def update
		campaign = Campaign.find(params[:id])
		campaign.update(campaign_params)
		render json: Campaign.find(params[:id])
	end

	private

	def campaign_params
		params.permit(
			:image,
			:description
		)
	end

end