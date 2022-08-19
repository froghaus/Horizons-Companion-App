class AssignedKnack < ApplicationRecord
	belongs_to :knack
	belongs_to :character
end