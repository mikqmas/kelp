class Review < ActiveRecord::Base
  validates :rating, inclusion: { in: (1..5) }
  validates(
    :user_id,
    :business_id,
    presence: true
  )

  belongs_to :user
  belongs_to :business
end
