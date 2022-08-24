class Edition < ApplicationRecord
	validates :title, presence: true

	has_many :roles
	has_many :cultures

	def passions
		return Passion.all
	end

	def misfortunes
		return Misfortune.all
	end

	def anxieties
		return Anxiety.all
	end

	def trait_dice
		options = {
			option_one: [12, 10, 8, 6, 6],
			option_two: [12, 10, 8, 8, 6]
		}
		return options
	end

	def reaction_dice
		return [8, 8, 6]
	end

	def aspect_dice
		return [10, 8, 8, 8, 8, 8, 6, 6, 6, 4]
	end

end