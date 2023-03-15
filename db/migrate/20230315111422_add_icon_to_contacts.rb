class AddIconToContacts < ActiveRecord::Migration[7.0]
  def change
    add_columns :contacts , :icon, type: "string"
  end
end
