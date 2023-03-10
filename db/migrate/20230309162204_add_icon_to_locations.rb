class AddIconToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :icon, :string
  end
end
