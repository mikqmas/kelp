class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :business

  validates(
    :rating,
    :user_id,
    :business_id,
    presence: true
  )
end
