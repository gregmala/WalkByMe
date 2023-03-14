class ApplicationController < ActionController::Base
  before_action :authenticate_user!, unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?

  include Pundit::Authorization

  # Pundit: allow-list approach
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  # Uncomment when you *really understand* Pundit!
  # rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  # def user_not_authorized
  #   flash[:alert] = "You are not authorized to perform this action."
  #   redirect_to(root_path)
  # end

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone_number])

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(:account_update, keys: [:phone_number, :first_name, :last_name, :avatar, :email])
  end

  def homesafe_text
    @user = current_user
    authorize @user
    TwilioClient.new.homesafe_text(@user)
    flash[:success] = "Homesafe text sent to #{@user.first_name}!"
  end

  def danger_text
    @user = current_user
    authorize @user
    TwilioClient.new.danger_text(@user)
  end

  private

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end

  def devise_controller?
    is_a?(DeviseController)
  end

  def after_sign_out_path_for(resource_or_scope)
    new_user_registration_path
  end
end
