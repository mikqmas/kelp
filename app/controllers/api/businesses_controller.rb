class Api::BusinessesController < ApplicationController
  before_action :require_logged_in, only: [:create]
  def create
    @business = Business.create!(business_params)
    render :show
  end

  def index
    businesses = Business.all
    if(bounds)
      businesses = Business.in_bounds(bounds)
    end
    @businesses = businesses.includes(:reviews)
    render :index
  end

  def business_params
    params.require(:business).permit(:name, :address, :rating, :price, :health_score)
  end
end
