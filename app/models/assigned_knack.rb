class AssignedKnack < ApplicationRecord
	belongs_to :knack, presence: true
	belongs_to :character, presence: true
end