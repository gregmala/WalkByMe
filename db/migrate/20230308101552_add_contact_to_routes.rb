class AddContactToRoutes < ActiveRecord::Migration[7.0]
  def change
    add_reference :routes, :contact, foreign_key: true
  end
end
