class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :destroy , :update]

  def index
    @locations = policy_scope(Location)
  end

  def show
    @location.user = current_user
    authorize @location
  end

  def edit
    authorize @location
  end

  def update
    authorize @location
    @location.update(location_params)
    redirect_to user_locations_path(current_user)
  end

  def new
    @location = Location.new
    authorize @location
  end

  def create
    @location = Location.new(location_params)
    @location.user = current_user
    authorize @location
    @location.save
    redirect_to user_locations_path(current_user)
  end

  def destroy
    @location.destroy
    authorize @location
    redirect_to user_locations_path(current_user)
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :address, :icon)
  end

end
