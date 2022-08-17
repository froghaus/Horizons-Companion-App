class Anxiety < ApplicationRecord
  validates :title, presence: true
	validates :flavor_text, presence: true
	validates :passive, presence: true
	validates :trigger, presence: true

	has_many :assigned_anxieties
  has_many :characters, through: :asssigned_anxieties
end