class AssignedAnxiety < ApplicationRecord
	belongs_to :anxieties, presence: true
	belongs_to :character, presence: true
end