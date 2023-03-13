class AddStatus < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins, :status, :string, default: "Ongoing"
  end
end
