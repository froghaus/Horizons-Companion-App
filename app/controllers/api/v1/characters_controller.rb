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
    user = User.find(data[:user_id])
    character = Character.new(
      user: user,
      athletic: data[:athletic],
      athletic_bonus: data[:athletic_bonus],
      combat: data[:combat],
      combat_bonus: data[:combat_bonus],
      convincing: data[:convincing],
      convincing_bonus: data[:convincing_bonus],
      culture: Culture.find(data[:culture_id]),
      current_vitality: 2,
      experience: 0,
      expressive: data[:expressive],
      expressive_bonus: data[:expressive_bonus],
      graceful: data[:graceful],
      graceful_bonus: data[:graceful_bonus],
      grit: data[:grit],
      grit_bonus: data[:grit_bonus],
      intuitive: data[:intuitive],
      intuitive_bonus: data[:intuitive_bonus],
      motor: data[:motor],
      motor_bonus: data[:motor_bonus],
      name: data[:name],
      passion: Passion.find(data[:passion_id]),
      perceptive: data[:perceptive],
      perceptive_bonus: data[:perceptive_bonus],
      physique: data[:physique],
      physique_bonus: data[:physique_bonus],
      reason: data[:reason],
      reason_bonus: data[:reason_bonus],
      reflexes: data[:reflexes],
      reflexes_bonus: data[:reflexes_bonus],
      resolve: data[:resolve],
      resolve_bonus: data[:resolve_bonus],
      role: Role.find(data[:role_id]),
      rugged: data[:rugged],
      rugged_bonus: data[:rugged_bonus],
      social: data[:social],
      social_bonus: data[:social_bonus],
      studious: data[:studious],
      studious_bonus: data[:studious_bonus],
      subtle: data[:subtle],
      subtle_bonus: data[:subtle_bonus],
      tactile: data[:tactile],
      tactile_bonus: data[:tactile_bonus],
      wits: data[:wits],
      wits_bonus: data[:wits_bonus]
    )

    if character.save
      starting_skills = character.role.skills.where(starting: true)
      starting_skills.each do |skill|
        AssignedSkill.create(character: character, skill: skill)
      end

      data[:taken_skills].split(",").each do |skill_id|
        AssignedSkill.create(character: character, skill: Skill.find(skill_id.to_i))
      end

      AssignedKnack.create(character: character, knack: Knack.find(data[:role_knack]))
      AssignedKnack.create(character: character, knack: Knack.find(data[:culture_knack]))
      
      if data[:anxiety_id] != "false"
        AssignedAnxiety.create(character: character, anxiety: Anxiety.find(data[:anxiety_id]))
      end

      if data[:misfortune_id] != "false"
        AssignedMisfortune.create(character: character, misfortune: Misfortune.find(data[:misfortune_id]))
      end
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