class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :body
      t.float :rating
      t.integer :user_id, null:false
      t.integer :business_id, null:false

      t.timestamps null: false
    end
  end
end
