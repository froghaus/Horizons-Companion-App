class BuildHelper < ApplicationRecord

  def self.assign(data)
    character = Character.new(
      user: User.find(data[:user_id]),
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
    return character
  end

  def self.assign_starting_skills(character)
    starting_skills = character.role.skills.where(starting: true)
    starting_skills.each do |skill|
      AssignedSkill.create(character: character, skill: skill)
    end
  end

  def self.assign_taken_skills(character, taken_skills)
    taken_skills.split(",").each do |skill_id|
      AssignedSkill.create(character: character, skill: Skill.find(skill_id.to_i))
    end
  end

  def self.assign_anxiety(character, anxiety_id)
    if anxiety_id != "false"
      AssignedAnxiety.create(character: character, anxiety: Anxiety.find(anxiety_id))
    end
  end

  def self.assign_misfortune(character, misfortune_id)
    if misfortune_id != "false"
      AssignedMisfortune.create(character: character, misfortune: Misfortune.find(misfortune_id))
    end
  end

end