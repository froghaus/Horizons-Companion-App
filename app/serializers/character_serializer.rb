class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :image, :text_info, :leveling_info, :role, :culture, :trait_dice, :aspect_dice, :reaction_dice, :speed, :resources, :current_resources, :passion, :misfortunes, :anxieties, :skills, :knacks, :skill_options, :knack_options, :inventory
end
