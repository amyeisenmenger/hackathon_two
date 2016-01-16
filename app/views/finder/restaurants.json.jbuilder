json.restaurants @restaurants do |restaurant|
  json.id restaurant.id
  json.name restaurant.name
  json.rating restaurant.rating
  json.priceLevel restaurant.price_level
  json.reviews restaurant.reviews
  json.types restaurant.types
  json.openingHours restaurant.opening_hours
  json.lat restaurant.lat
  json.lng restaurant.lng
end