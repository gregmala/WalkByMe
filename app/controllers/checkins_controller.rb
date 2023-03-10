class CheckinsController < ApplicationController

  def index
    @checkins = policy_scope(Checkin)
  end

  def end_trip
    @checkin = Checkin.find(params[:id])
    authorize @checkin
    @checkin.update(can_end_trip: true, status: "Completed")
    @checkin.save
    redirect_to checkins_path
  end

  def show
    @checkin = Checkin.find(params[:id])
    authorize @checkin
  end


  def create
    @checkin = Checkin.new()
    @checkin.user = current_user
    authorize @checkin
    @checkin.save
    redirect_to checkin_path(@checkin)
  end

  def update
    @checkin = Checkin.find(params[:id])
    authorize @checkin
    @checkin.update(checkin_params)
  end


  private


  def checkin_params
    params.require(:checkin).permit(:estimated_time_for_arrival, :destination_latitude, :destination_longitude, :can_end_trip)
  end
end
