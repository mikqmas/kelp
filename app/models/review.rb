class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :business

  has_many :tagging

  validates(
    :rating,
    :user_id,
    :business_id,
    presence: true
  )
end
