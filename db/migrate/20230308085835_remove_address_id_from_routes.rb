class RemoveAddressIdFromRoutes < ActiveRecord::Migration[7.0]
  def change
    remove_index :routes, name: :index_routes_on_address_id
  end
end
