class Character < ApplicationRecord
  mount_uploader :image, ImageUploader

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

	belongs_to :role
	belongs_to :culture
	belongs_to :user
	belongs_to :passion

	has_many :assigned_skills
	has_many :skills, through: :assigned_skills
	has_many :assigned_knacks
	has_many :knacks, through: :assigned_knacks
	has_many :assigned_items
	has_many :items, through: :assigned_items
	has_many :assigned_misfortunes
	has_many :misfortunes, through: :assigned_misfortunes
	has_many :assigned_anxieties
	has_many :anxieties, through: :assigned_anxieties

	def trait_dice 
		payload = {
			physique: (self.physique + self.physique_bonus),
			motor: (self.motor + self.motor_bonus),
			reason: (self.reason + self.reason_bonus),
			social: (self.social + self.social_bonus),
			wits: (self.wits + self.wits_bonus)
		}

    return payload
	end

	def aspect_dice
		payload = {
			athletic: (self.athletic + self.athletic_bonus),
			convincing: (self.convincing + self.convincing_bonus),
			expressive: (self.expressive + self.expressive_bonus),
			graceful: (self.graceful + self.graceful_bonus),
			intuitive: (self.intuitive + self.intuitive_bonus),
			perceptive: (self.perceptive + self.perceptive_bonus),
			rugged: (self.rugged + self.rugged_bonus),
			studious: (self.studious + self.studious_bonus),
			subtle: (self.subtle + self.subtle_bonus),
			tactile: (self.tactile + self.tactile_bonus),
			combat: (self.combat + self.combat_bonus)
		}

    return payload
	end

  def reaction_dice
    payload = {
      grit: (self.grit + self.grit_bonus),
      reflexes: (self.reflexes + self.reflexes_bonus),
      resolve: (self.resolve + self.resolve_bonus)
    }

    return payload
  end

	def resources
		payload = {
			health: self.health,
			vitality: 2,
			willpower: self.willpower,
			rest_die_pool: self.rest_dice_pool
		}

    return payload
	end

  def current_resources
    payload = {
      health: self.current_health,
      vitality: self.current_vitality,
      stress: self.current_stress,
      rest_die_pool: self.current_rest_pool
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
		self.role.skills - self.skills
	end

	def knack_options
		payload = self.role.knacks + self.culture.knacks
    payload -= self.knacks
    return payload
	end

  def health
    fys = self.physique + self.physique_bonus
    if fys > 12
      fys = 12
    end
    mot = self.motor + self.motor_bonus
    if mot > 12
      mot = 12
    end

    health = (fys + mot) / 2 + self.bonus_to_health
    return health
  end

  def willpower
    rea = self.reason + self.reason_bonus
    soc = self.social + self.social_bonus
    wit = self.wits + self.wits_bonus

    mental = [rea, soc, wit]
    mental.delete_at(mental.index(mental.min))

    return mental.sum
  end

  def rest_dice_pool
    pool = 8 + self.bonus_to_rest_pool
    if self.wits + self.wits_bonus >= 10
      pool += 1
    end
    if self.physique + self.physique_bonus
      pool += 1
    end

    return pool
  end

  def inventory
    payload = {
      carry_capacity: self.carry_capacity,
      current_load: self.current_load,
      wealth: self.wealth,
      supplies: self.supplies,
      gear: self.items
    }

    return payload
  end

  def text_info
    payload = {
      bio: self.bio,
      description: self.description,
      proficiencies: self.role.proficiencies,
      training: self.role.training
    }
  end

  def leveling_info
		next_feature = self.level + 3
		payload = {
			level: self.level,
			experience: self.experience,
			feature_cost: next_feature
		}

		return payload
  end
end