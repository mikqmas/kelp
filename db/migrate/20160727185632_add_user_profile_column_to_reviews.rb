class AddUserProfileColumnToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :user_profile, :string
  end
end
