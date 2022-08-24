class RoleSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :starting_skills, :skill_options, :knacks, :growth_opportunities, :training, :proficiencies, :combat_die, :reaction_bonus, :ability 
end
