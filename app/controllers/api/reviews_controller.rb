class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    if @review.save
      render "api/businesses"
    else
      render json: @review.errors, status: 422
    end
  end

  def review_params
    params.require(:review).permit(:user_id, :business_id, :body, :rating)
  end

end
