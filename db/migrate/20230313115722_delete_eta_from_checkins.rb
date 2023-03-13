class DeleteEtaFromCheckins < ActiveRecord::Migration[7.0]
  def change
    remove_column :checkins , :eta
  end
end
