class Character < ApplicationRecord
	validates :name, presence: true

	validates :physique, presence: true
	validates :motor, presence: true
	validates :social, presence: true
	validates :reason, presence: true
	validates :wits, presence: true
	
	validates :athletic, presence: true
	validates :convincing, presence: true
	validates :expressive, presence: true
	validates :graceful, presence: true
	validates :intuitive, presence: true
	validates :perceptive, presence: true
	validates :rugged, presence: true
	validates :studious, presence: true
	validates :subtle, presence: true
	validates :tactile, presence: true
	validates :combat, presence: true

	validates :grit, presence: true
	validates :reflexes, presence: true
	validates :resolve, presence: true

	belongs_to :role, presence: true
	belongs_to :culture, presence: true
	belongs_to :user, presence: true
	belongs_to :passion, presence: true

	has_many :assigned_skills
	has_many :skills, through: :assigned_skills
	has_many :assigned_knacks
	has_many :knacks, through: :assigned_knacks
	has_many :assigned_items
	has_many :items, through: :assigned_items
	has_many :assigned_misfortunes
	has_many :misfortunes, through: :assigned_misfortunes
	has_many :asssigned_anxieties
	has_many :anxieties, through: :assigned_anxieties

	def trait_dice 
		return {
			physique: (self.physique + self.physique_bonus)
			motor: (self.motor + self.motor_bonus)
			reason: (self.reason + self.reason_bonus)
			social: (self.social + self.social_bonus)
			wits: (self.wits + self.wits_bonus)
		}
	end

	def aspect_dice
		return {
			athletic: (self.athletic + self.athletic_bonus)
			convincing: (self.convincing + self.convincing_bonus)
			expressive: (self.expressive + self.expressive_bonus)
			graceful: (self.graceful + self.graceful_bonus)
			intuitive: (self.intuitive + self.intuitive_bonus)
			perceptive: (self.perceptive + self.perceptive_bonus)
			rugged: (self.rugged + self.rugged_bonus)
			studious: (self.studious + self.studious_bonus)
			subtle: (self.subtle + self.subtle_bonus)
			tactile: (self.tactile + self.tactile_bonus)
			combat: (self.combat + self.combat_bonus)
		}
	end

	def resources
		return {
			health: (self.base_health + self.bonus_to_health)
			vitality: 3
			willpower: (self.base_willpower + self.bonus_to_willpower)
			rest_die_pool: (self.base_rest_pool + self.bonus_to_rest_pool)
		}
	end

	def speed 
		speed = 15
		checks = ["physique", "motor", "athletic", "graceful"]

		checks.each do |check|
			if (self["#{check}"] + self["#{check}_bonus"]) >= 10
				speed += 5
			end
		end

		return speed
	end

	def carry_capacity 
		carry_cap = 4 + self.bonus_to_carry_capacity

		checks = ["physique", "athletic", "rugged", "tactile"]

		checks.each do |check|
			if (self["#{check}"] + self["#{check}_bonus"]) >= 10
				carry_cap += 2
			end
		end

		return carry_cap
	end

	def current_load
		self.items.sum(:bulk)
	end

	def skill_options
		self.role.skills
	end

	def knack_options
		return (self.role.knacks + self.culture.knacks)
	end

end