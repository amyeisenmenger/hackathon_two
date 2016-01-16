class FinderController < ApplicationController
  def index
  end

  def search
    @client = GooglePlaces::Client.new(@api_key)
    @location = Geocoder.coordinates(params[:location])
    @restaurants = @client.spots(@location.first, @location.last, :types => ['restaurant', 'food'], :radius => 1000)
    render 'restaurants'
  end

end
