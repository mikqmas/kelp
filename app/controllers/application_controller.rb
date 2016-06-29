class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  private
 def require_no_user!
   redirect_to cats_url if current_user
 end

 def current_user
   return nil unless session[:session_token]
   @current_user ||= User.find_by_session_token(session[:session_token])
 end

 def logged_in?
   !current_user.nil?
 end

 def login_user!(user)
   session[:session_token] = user.reset_session_token!
 end

 def logout_user!
   current_user.reset_session_token!
   session[:session_token] = nil
 end

 def require_user!
   redirect_to new_session_url if current_user.nil?
 end

 def require_logged_in
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end
end
