class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def create
    review = Review.new(review_params)
    if review.save
      @business = review.business
      render "api/businesses/show"
    else
      render json: @review.errors, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:user_id, :business_id, :body, :rating)
  end

end
