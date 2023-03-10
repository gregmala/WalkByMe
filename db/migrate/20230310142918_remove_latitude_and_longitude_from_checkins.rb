class RemoveLatitudeAndLongitudeFromCheckins < ActiveRecord::Migration[7.0]
  def change
    remove_column :checkins , :latitude
    remove_column :checkins , :longitude
  end
end
