class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :label
      t.string :places
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
