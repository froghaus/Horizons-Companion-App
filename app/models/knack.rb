class Knack < ApplicationRecord
	validates :title, presence: true
	validates :rules_text, presence: true

	belongs_to :role
	belongs_to :culture

	has_many :assigned_knacks
	has_many :characters, through: :assigned_knacks

	def options_array
		return self.options.split("//")
	end
end