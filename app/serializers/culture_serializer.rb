class CultureSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :aspect_bonus_options, :aspect_bonus_assignable , :knacks
end
