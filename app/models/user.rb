class User < ApplicationRecord
  
  has_many :contacts
  has_many :routes
  has_many :addresses, through: :routes
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
end
