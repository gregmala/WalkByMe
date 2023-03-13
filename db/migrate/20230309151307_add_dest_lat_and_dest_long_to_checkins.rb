class AddDestLatAndDestLongToCheckins < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins, :destination_latitude, :float
    add_column :checkins , :destination_longitude, :float
  end
end
