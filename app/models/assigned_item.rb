class AssignedItem < ApplicationRecord
  belongs_to :character, presence: true
	belongs_to :item, presence: true
end