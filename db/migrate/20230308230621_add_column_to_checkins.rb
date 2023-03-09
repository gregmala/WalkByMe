class AddColumnToCheckins < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins , :latitude , :float
    add_column :checkins , :longitude , :float
    add_column :checkins, :recorded_on, :integer
  end
end
