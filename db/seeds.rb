# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'yelp'
require_relative 'imgs'
require_relative 'reviews'

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
90003, 90005, 90007,
90011, 90013, 90014,
90031, 90034, 90037,
# 90041, 90043, 90044,
90071, 90079, 90090,
# 90095, 90275, 90291,
91324, 91326, 91331,
# 91340, 91343, 91344,
91423, 91436, 91601,
# 91602, 91604, 91606,

# ny
# 10001, 10005,
10006, 10009, 10010,
# 10012, 10017,
10018, 10020, 10021,
# 10033, 10037,
10038, 10040, 10044,
# 10069, 10111,
10112, 10119, 10128,
# 10173, 10271,
10278, 10280, 10282,
# 10312, 10453,
10454, 10456, 10457,
# 10469, 10473,
10474, 11004, 11005,
]

User.create(username: "sam", password: "testing")

20.times do |i|
  User.create(username: "", password: "testing", profile_url: "https://i.imgur.com/#{IMGS.sample}b.jpg")
end

zips.each do |zip|
  thisCity = client.search("#{zip}", {term: 'food'})

  20.times do |i|
    next if thisCity.businesses[i].location.coordinate == nil
    lat = thisCity.businesses[i].location.coordinate.latitude
    lng = thisCity.businesses[i].location.coordinate.longitude
    address = thisCity.businesses[i].location.display_address.join(", ")
    city = thisCity.businesses[i].location.city
    state = thisCity.businesses[i].location.state_code
    zip = thisCity.businesses[i].location.postal_code
    phone = thisCity.businesses[i].display_phone
    description = thisCity.businesses[i].snippet_text
    category = thisCity.businesses[i].categories.join(" ")
    name = thisCity.businesses[i].name
    picture = thisCity.businesses[i].image_url
    price = rand(4) + 1

    Business.create(
        lat: "#{lat}",
        lng: "#{lng}",
        address: "#{address}",
        city: "#{city}",
        state_code: "#{state}",
        postal_code: "#{zip}",
        phone: "#{phone}",
        description: "#{description}",
        category: "#{category}",
        name: "#{name}",
        price: "#{price}",
        picture_url: "#{picture}",
        img1: "https://i.imgur.com/#{IMGS.sample}.jpg",
        img2: "https://i.imgur.com/#{IMGS.sample}.jpg",
        img3: "https://i.imgur.com/#{IMGS.sample}.jpg",
        img4: "https://i.imgur.com/#{IMGS.sample}.jpg",
        img5: "https://i.imgur.com/#{IMGS.sample}.jpg",
      )

      (rand(6) + 4).times do
        Review.create(
          user_id: (rand(20) + 1),
          business_id: Business.last.id,
          body: FAKEREVIEWS.sample,
          rating: (rand(5) + 1),
          user_profile: "https://i.imgur.com/#{IMGS.sample}b.jpg"
        )
      end
  end

end
