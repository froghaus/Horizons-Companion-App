class RoleSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :skills, :knacks, :growth_opportunities, :training, :proficiencies, :combat_die, :reaction_bonus, :ability 
end
