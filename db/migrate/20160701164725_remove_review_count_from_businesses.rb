class RemoveReviewCountFromBusinesses < ActiveRecord::Migration
  def change
    remove_column :businesses, :review_count, :integer
  end
end
