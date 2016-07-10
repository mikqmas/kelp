# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'yelp'

client = Yelp::Client.new({ consumer_key: "SeiwYq9KW9sedsZUd9d8Yg",
                            consumer_secret: "ZPegLm0ar4eqsXHwF6CsMYWXtZE",
                            token: "8glTZPeEJFqpUdFQFinkceVCJJJuj60Y",
                            token_secret: "Y5iczjARxidQHLRo-99JwE-IX40"
                          })

zips = [
# sf
94102, 94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111,
94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124,
94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158,

# la
90003, 90005, 90007, 90011, 90013, 90014,
90031, 90034, 90037, 90041, 90043, 90044,
90071, 90079, 90090, 90095, 90275, 90291,
91324, 91326, 91331, 91340, 91343, 91344,
91423, 91436, 91601, 91602, 91604, 91606,

# ny
10001, 10005, 10006, 10009, 10010,
10012, 10017, 10018, 10020, 10021,
10033, 10037, 10038, 10040, 10044,
10069, 10111, 10112, 10119, 10128,
10173, 10271, 10278, 10280, 10282,
10312, 10453, 10454, 10456, 10457,
10469, 10473, 10474, 11004, 11005,

# chicago
60018, 60068, 60176, 60601, 60602,
60608, 60609, 60610, 60611, 60612,
60623, 60624, 60625, 60626, 60628,
60637, 60639, 60640, 60641, 60642,
60655, 60656, 60657, 60659, 60660,

#seattle
98101, 98102, 98103, 98104, 98105,
98116, 98117, 98118, 98119, 98121,
98136, 98144, 98154, 98164, 98174
]

zips.each do |zip|
  city = client.search("#{zip}")

  20.times do |i|
    lat = city.businesses[i].location.coordinate.latitude
    lng = city.businesses[i].location.coordinate.longitude
    address = city.businesses[i].location.display_address.join(", ")
    city = city.businesses[i].location.city
    state = city.businesses[i].location.state_code
    zip = city.businesses[i].location.postal_code
    phone = city.businesses[i].display_phone
    description = city.businesses[i].snippet_text
    category = city.businesses[i].categories.join(" ")
    name = city.businesses[i].name
    picture_url = city.businesses[i].image_url
    price = rand(4) + 1

    Business.create(
        lat: "#{lat}",
        lng: "#{lng}",
        address: "#{address}",
        city: "#{city}",
        state: "#{state}",
        zip: "#{zip}",
        phone: "#{phone}",
        description: "#{description}",
        category: "#{category}",
        name: "#{name}",
        picture_url: "#{picture_url}",
        price: "#{price}"
      )
  end

end
