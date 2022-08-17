class Passion < ApplicationRecord
	validates :title, presence: true
	validates :flavor_text, presence: true
	validates :passive, presence: true
	validates :trigger, presence: true

  has_many :characters
end