class RemoveNameUniqueFromBusiness < ActiveRecord::Migration
  def change
    remove_index :businesses, :name
    add_index :businesses, :name
    add_index :businesses, :lat
    add_index :businesses, :lng
    add_index :businesses, :category
    add_column :businesses, :img1, :string
    add_column :businesses, :img2, :string
    add_column :businesses, :img3, :string
    add_column :businesses, :img4, :string
    add_column :businesses, :img5, :string
  end
end
