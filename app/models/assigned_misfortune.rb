class AssignedMisfortune < ApplicationRecord
	belongs_to :character, presence: true
	belongs_to :misfortune, presence: true
end