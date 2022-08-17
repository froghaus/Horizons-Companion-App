class Role < ApplicationRecord
	validates :title, presence: true
	validates :description, presence: true
	validates :growth, presence: true
	validates :training, presence: true
	validates :proficiencies, presence: true
	validates :combat_die, presence: true
	validates :reaction_bonus, presence: true
	validates :ability_text, presence: true
	validates :ability_title, presence: true

	has_many :skills
	has_many :knacks
	has_many :characters

	def growth_opportunities
		return self.growth.split("//")
	end

	def knack_options
		self.knacks
	end

	def skill_options
		self.skills
	end
end