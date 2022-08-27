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

	belongs_to :edition



	def growth_opportunities
		return self.growth.split("//")
	end

	def ability 
		ability = {
			title: self.ability_title,
			text: self.ability_text
		}
		return ability
	end

	def knack_options
		self.knacks
	end

	def skill_options
		self.skills.where(starting: nil)
	end

	def starting_skills
		self.skills.where(starting: true)
	end
end