class CreateRoutes < ActiveRecord::Migration[7.0]
  def change
    create_table :routes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :address, null: false, foreign_key: true
      t.string :status
      t.integer :estimated_arrival

      t.timestamps
    end
  end
end
