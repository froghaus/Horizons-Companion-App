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

  def new
    render json: Edition.first
  end

  def create
    data = character_params
    character = BuildHelper.assign(data)

    if character.save
      BuildHelper.assign_starting_skills(character)
      BuildHelper.assign_taken_skills(character, data[:taken_skills])
      AssignedKnack.create(character: character, knack: Knack.find(data[:role_knack]))
      AssignedKnack.create(character: character, knack: Knack.find(data[:culture_knack]))
      BuildHelper.assign_anxiety(character, data[:anxiety_id])
      BuildHelper.assign_misfortune(character, data[:misfortune_id])

      render json: {status: 200}
    else
      render json: {error: "Unable to create character", status: :not_implemented}
    end
  end

  private

  def character_params
    params.permit(
      :bio,
      :description,
      :current_vitality,
      :current_health,
      :current_stress,
      :current_rest_pool,
      :experience,
      :level,
      :image,
      :anxiety_id,
      :athletic,
      :athletic_bonus,
      :bonus_to_carry_capacity,
      :bonus_to_health,
      :bonus_to_rest_pool,
      :bonus_to_willpower,
      :combat,
      :combat_bonus,
      :convincing,
      :convincing_bonus,
      :culture_id,
      :culture_knack,
      :current_stress,
      :current_vitality,
      :experience,
      :expressive,
      :expressive_bonus,
      :graceful,
      :graceful_bonus,
      :grit,
      :grit_bonus,
      :intuitive,
      :intuitive_bonus,
      :misfortune_id,
      :motor,
      :motor_bonus,
      :name,
      :passion_id,
      :perceptive,
      :perceptive_bonus,
      :physique,
      :physique_bonus,
      :reason,
      :reason_bonus,
      :reflexes,
      :reflexes_bonus,
      :resolve,
      :resolve_bonus,
      :role_id,
      :role_knack,
      :rugged,
      :rugged_bonus,
      :social,
      :social_bonus,
      :studious,
      :studious_bonus,
      :subtle,
      :subtle_bonus,
      :tactile,
      :tactile_bonus,
      :taken_skills,
      :vitality,
      :wits,
      :wits_bonus,
      :user_id
    )
  end

end 