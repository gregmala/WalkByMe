class AddEtaToCheckins < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins, :eta, :float
  end
end
