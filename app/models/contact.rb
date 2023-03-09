class Contact < ApplicationRecord
  has_one_attached :avatar
  belongs_to :user
  balongs_to :routes
end
