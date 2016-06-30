class AddPictureUrlToBusiness < ActiveRecord::Migration
  def change
    add_column :businesses, :picture_url, :string
  end
end
