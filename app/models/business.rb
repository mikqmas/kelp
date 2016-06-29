class Business < ActiveRecord::Base
  validates(
    :name,
    :address,
    :rating,
    presence: true
  )

  has_many :reviews
end
