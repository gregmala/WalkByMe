class AddDurationToCheckins < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins, :estimated_time_for_arrival , :integer
  end
end
