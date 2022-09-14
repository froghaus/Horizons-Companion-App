class Api::V1::CampaignsController < ApiController

	def index 
		render json: current_user.get_campaigns
	end

	def show
		render json: {campaign: Campaign.find(params[:id]), current_user: current_user}
	end

end