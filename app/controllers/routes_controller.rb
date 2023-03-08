class RoutesController < ApplicationController
  before_action :set_routes, only: [:show]

  def index
    @routes = policy_scope(Route)
  end

  def show
    @route.user = current_user
    authorize @route
  end

  def new
    @route = Route.new
    authorize @route
  end

  def create
    @route = Route.new(route_params)
    @route.user = current_user
    authorize @route
    @route.save
    redirect_to user_routes_path(current_user)
  end

  def set_route
    @route = Route.find(params[:id])
  end

  def route_params
    params.require(:route).permit(:status, :estimated_arrival, :starting_point, :destination)
  end
end
