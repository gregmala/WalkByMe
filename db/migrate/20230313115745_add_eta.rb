class AddEta < ActiveRecord::Migration[7.0]
  def change
    add_column :checkins , :eta , :integer
  end
end
