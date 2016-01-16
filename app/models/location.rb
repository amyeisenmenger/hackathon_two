class Location < ActiveRecord::Base
  after_validation :geocode

  private 
  def geocode
  end
end
