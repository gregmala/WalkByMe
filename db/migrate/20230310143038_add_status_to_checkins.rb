class AddStatusToCheckins < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins , :statuts , :string , default: "Ongoing"
  end
end
