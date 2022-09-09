class Api::V1::CampaignsController < ApiController

	def index 
		render json: current_user.get_campaigns
	end
end