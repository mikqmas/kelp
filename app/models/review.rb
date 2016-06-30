class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :business

  validates(
    :user_id,
    :business_id,
    presence: true
  )

  validates :rating, inclusion: { in: (1..5) }
end
