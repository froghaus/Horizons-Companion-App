class Api::V1::CharactersController < ApiController

  def index
		render json: Character.where(user: current_user)
  end

  def show
    render json: Character.find(params[:id])  
  end

  def update
    character = Character.find(params[:id])
    character.update(character_params)
    render json: Character.find(params[:id])
  end

  private

  def character_params
    params.require(:character).permit(:bio, :description, :current_health, :current_stress, :current_rest_pool, :experience, :level)
  end

end 