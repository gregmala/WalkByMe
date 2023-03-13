class UsersController < ApplicationController

  def show
    @user = current_user
    authorize @user
  end

  def edit
    @user = current_user
    authorize @user
    # if @user.update(user_params)
    #   redirect_to @user
    # end
  end

  def update
    @user = current_user
    authorize @user
    @user.update(user_params)
    redirect_to user_path(@user)
  end

  def destroy
    @user = current_user
    authorize @user
    @user.destroy
  end


  def update_location
    current_user.update(latitude: params[:user][:latitude], longitude: params[:user][:longitude])
    head :ok
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :phone_number, :photo)
  end

end
