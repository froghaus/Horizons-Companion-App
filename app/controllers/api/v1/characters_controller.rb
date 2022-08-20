class Api::V1::CharactersController < ApiController

  def index
		render json: Character.where(user: current_user)
  end
end 