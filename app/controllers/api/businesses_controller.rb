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

    if(params[:reviewCount])
      #currently causing +n query. Should fix for bonus.
      businesses = businesses.joins(:reviews).group("businesses.id")
        .having("count(businesses.id) >= ?", params[:reviewCount].to_i)

      # failed attempt at hand written sql query.
      # businesses = Business.find_by_sql "
      #   SELECT businesses.*
      #   FROM businesses
      #   JOIN reviews
      #   ON businesses.id = reviews.business_id
      #   GROUP BY businesses.id
      #   HAVING COUNT(businesses.id) > 1
      # "
    end

    if(params[:review])
      businesses = businesses.joins(:reviews).group("businesses.id")
        .having("avg(rating) >= ?", params[:review].to_i)
    end


    if(params[:prices])
      businesses = businesses.where("price <= ? AND price >= ?",
                  params[:prices].max.to_i, params[:prices].min.to_i)
    end

    # if(params[:review])
    #   businesses = businesses.where("rating >= ?", params[:review])
    # end


    if(params[:category])
      businesses = businesses.where(
      "lower(category) LIKE ? OR lower(name) LIKE ?",
      "%#{params[:category].downcase}%", "%#{params[:category].downcase}%")
    end
    # @businesses = businesses.includes(:reviews)
    @businesses = businesses
    render :index
  end


  private

  def business_params
    params.require(:business).permit(:name, :address, :price, :description,
      :health_score, :hours, :phone, :city, :postal_code, :state_code,
      :picture_url, :category, :lat, :lng)
  end

  def bounds
    params[:bounds]
  end

end
