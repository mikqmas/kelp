class AddPostalCodeToBusinesses < ActiveRecord::Migration
  def change
    remove_column :businesses, :postal_code
    add_column :businesses, :postal_code, :string
  end
end
