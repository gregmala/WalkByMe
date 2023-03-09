class RemovePhotoFromContacts < ActiveRecord::Migration[7.0]
  def change
    remove_column :contacts, :photo, :string
  end
end
