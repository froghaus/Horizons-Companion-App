class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :characters
  has_many :players
  has_many :campaigns, through: :players

  def get_campaigns
    payload = {
      owner: Campaign.where(user: self),
      player: self.campaigns
    }
    return payload
  end
end
