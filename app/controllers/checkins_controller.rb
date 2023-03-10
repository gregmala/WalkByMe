class CheckinsController < ApplicationController

  def show
    @checkin = 
  end

  def new
    @checkin = Checkin.new()
    @checkin.user = current_user
    authorize @checkin
  end

  def create
    @checkin = Checkin.new(checkin_params)
    if @checkin.save
      check_end_trip(@checkin)
      redirect_to checkin_path(@checkin)
  end

  private


  def checkin_params
    params.require(:checkin).permit(:estimated_time_for_arrival, :destination_latitude, :destination_longitude, :can_end_trip)
  end

  def check_end_trip(checkin)

  if checkin.estimated_time_for_arrival > 3
    checkin.update(can_end_trip: true)
  end
  end
  # Use a library or write your own function to calculate the distance between two points on the Earth's surface
end
