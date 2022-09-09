class Campaign < ApplicationRecord
	validates :title, presence: true
    validates :description, presence: true
    
    belongs_to :user

    has_many :players
    has_many :users, through: :players
    has_many :characters
end