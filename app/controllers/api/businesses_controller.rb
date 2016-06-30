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

    if(params[:price])
      businesses = businesses.where("price <= ?", params[:price])
    end

    if(params[:review])
      businesses = businesses.where("rating >= ?", params[:review])
    end

    if(params[:reviewCount])
      businesses = businesses.where("review_count >= ?", params[:reviewCount])
    end

    if(params[:category])
      businesses = businesses.where("category LIKE ?", "%#{params[:category]}%")
    end
    @businesses = businesses.includes(:reviews)
    render :index
  end


  private

  def business_params
    params.require(:business).permit(:name, :address, :rating, :price,
      :health_score, :hours, :phone, :city, :postal_code, :state_code,
      :picture_url, :category, :lat, :lng)
  end

  def bounds
    params[:bounds]
  end

end
