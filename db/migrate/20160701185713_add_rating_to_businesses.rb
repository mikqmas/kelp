class AddRatingToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :rating, :float
  end
end
