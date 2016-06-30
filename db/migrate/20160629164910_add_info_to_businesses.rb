class AddInfoToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :description, :string
    add_column :businesses, :phone, :string
    add_column :businesses, :city, :string
    add_column :businesses, :lat, :float
    add_column :businesses, :lng, :float
    add_column :businesses, :postal_code, :integer
    add_column :businesses, :state_code, :string
    add_column :businesses, :review_count, :integer

    add_index :businesses, :postal_code
    add_index :businesses, :city
    add_index :businesses, :review_count
  end
end
