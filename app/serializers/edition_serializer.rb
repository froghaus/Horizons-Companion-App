class EditionSerializer < ActiveModel::Serializer
  attributes :passions, :misfortunes, :anxieties, :trait_dice, :reaction_dice, :aspect_dice

  has_many :roles
  has_many :cultures
end
