class RemoveForeighKey < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :routes, :addresses, name: "fk_rails_932ed7f2f2"
  end
end
