class ChangeIntegerLimitInYourTable < ActiveRecord::Migration[7.0]
  def change
    change_column :checkins, :recorded_on, :integer, limit: 8
  end
end
