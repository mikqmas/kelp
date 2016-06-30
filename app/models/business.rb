class Business < ActiveRecord::Base
  validates(
    :name,
    :address,
    presence: true
  )
  validates :price, inclusion: { in: (1..5) }, allow_nil: true

  has_many :reviews

  def self.in_bounds(bounds)
    self.where("lat < ?", bounds[:northEast][:lat])
        .where("lat > ?", bounds[:southWest][:lat])
        .where("lng > ?", bounds[:southWest][:lng])
        .where("lng < ?", bounds[:northEast][:lng])
  end

  def average_rating
    reviews.average(:rating)
  end

  def review_count
    reviews.count
  end
end
