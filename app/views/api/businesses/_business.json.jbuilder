json.extract! business, :id, :name, :address, :hours, :price,
  :health_score, :rating

json.reviews do
  json.partial! 'api/reviews/review', collection: business.reviews, as: :review
end
