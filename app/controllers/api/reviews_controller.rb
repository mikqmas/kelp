class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create]
  
  def create
    @review = Review.new(review_params)
    if @review.save
      render "api/businesses/index"
    else
      render json: @review.errors, status: 422
    end
  end

  def review_params
    params.require(:review).permit(:user_id, :business_id, :body, :rating)
  end

end
