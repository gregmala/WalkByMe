class AddCanEndTripToCheckins < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins, :can_end_trip, :boolean , default: false
  end
end
