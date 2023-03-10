class RemoveLatitudeLongitudeFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :latitude
    remove_column :users, :longitude
    remove_column :users, :recorded_on

  end
end
