class Skill < ApplicationRecord
	validates :title, presence: true
	validates :action_type, presence: true
	validates :rules_text, presence: true

	belongs_to :role

	has_many :assigned_skills
	has_many :characters, through: :assigned_skills
	
	def options_array
		return self.options.split("//")
	end
end