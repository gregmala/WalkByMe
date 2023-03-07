class User < ApplicationRecord
  validates :phone_number, format: { with: /\A\+?\d{1,4}[-.\s]?\d{6,14}\z/ }
  has_many :contacts
  has_many :routes
  has_many :addresses, through: :routes
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
end
