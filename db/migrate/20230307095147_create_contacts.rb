class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :label
      t.string :phone_number
      t.string :photo

      t.timestamps
    end
  end
end
