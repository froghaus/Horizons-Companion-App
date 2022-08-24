class Culture < ApplicationRecord
	validates :title, presence: true
	validates :aspect_bonuses, presence: true
	validates :description, presence: true

	has_many :knacks
	has_many :characters

	belongs_to :edition

	def dice_bonuses
		return self.aspect_bonuses.split("//")
	end

	def aspect_bonus_options
		return self.aspect_bonuses.split("//")
	end

	def knack_options
		self.knacks
	end
end