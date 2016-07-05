class Api::SessionsController < ApplicationController
  before_action :require_no_user!, only: [:create, :new]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user.nil?
      render(
        json: {
          base: ["Invalid username / password"]
        },
        status: 401
      )
    else
      login_user!(@user)
      render "api/users/show"
    end
  end

  def destroy
    @user = current_user
    if @user
      logout_user!
      render "api/users/show"
    else
      render(
        json: {
          base: ["Nobody signed in"]
        },
        status: 404
      )
		end
  end

end
