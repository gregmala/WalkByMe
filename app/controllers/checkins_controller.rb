class CheckinsController < ApplicationController
  def create
    @checkin = Checkin.new(checkin_params)
    @checkin.user = current_user
    authorize @checkin
    @checkin.save
  end

  private

  def checkin_params
    params.require(:checkin).permit(:latitude, :longitude, :recorded_on)
  end
end
