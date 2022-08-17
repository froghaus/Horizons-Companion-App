class Item < ApplicationRecord
	validates :title, presence: true
	validates :category, presence: true
	validates :sub_category, presence: true
	validates :tags, presence: true
	validates :rules_text, presence: true
	validates :bulk, presence: true
	
	has_many :assigned_items
	has_many :characters, through: :assigned_items

	def tags_array
		self.tags.split("//")
	end
end