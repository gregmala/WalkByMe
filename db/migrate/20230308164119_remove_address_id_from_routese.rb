class RemoveAddressIdFromRoutese < ActiveRecord::Migration[6.1]
  def change
    remove_column :routes, :address_id
  end
end
