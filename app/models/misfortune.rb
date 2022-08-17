class Misfortune < ApplicationRecord
  validates :title, presence: true
	validates :flavor_text, presence: true
	validates :passive, presence: true
	validates :trigger, presence: true

	has_many :assigned_misfortunes
  has_many :characters, through: :assigned_misfortunes
end