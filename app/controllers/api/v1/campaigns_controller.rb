class Api::V1::CampaignsController < ApiController

	def index 
		render json: Campaign.where(user: current_user)
	end
end