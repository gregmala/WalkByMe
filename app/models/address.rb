class Address < ApplicationRecord
  belongs_to :route
  has_one :user, through: :routes
end
