class CarouselController < ApplicationController
  def index
    @carousel = policy_scope(Carousel)
  end
end
