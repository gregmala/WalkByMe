class RemoveStatutsFromCheckins < ActiveRecord::Migration[7.0]
  def change
    remove_column :checkins, :statuts
  end
end
