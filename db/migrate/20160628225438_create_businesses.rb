class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.integer :rating, null: false
      t.string :hours
      t.integer :price
      t.integer :health_score

      t.timestamps null: false
    end
    add_index :businesses, :name, unique: true
    add_index :businesses, :rating
    add_index :businesses, :hours
    add_index :businesses, :price
  end
end
