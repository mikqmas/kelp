json.extract! business, :id, :name, :address, :hours, :price,
  :health_score, :phone, :description, :city, :state_code,
  :picture_url, :category, :postal_code, :lat, :lng, :average_rating,
  :review_count, :img1, :img2, :img3, :img4, :img5

json.reviews do
  json.partial! 'api/reviews/review', collection: business.reviews, as: :review
end
