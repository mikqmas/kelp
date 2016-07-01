class RemoveNullFalseForRatingBusiness < ActiveRecord::Migration
  def change
    remove_column :businesses, :rating
    add_column :businesses, :rating, :float
  end
end
