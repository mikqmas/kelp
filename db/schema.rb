# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160727185632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "businesses", force: :cascade do |t|
    t.string   "name",         null: false
    t.string   "address",      null: false
    t.string   "hours"
    t.integer  "price"
    t.integer  "health_score"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "description"
    t.string   "phone"
    t.string   "city"
    t.float    "lat"
    t.float    "lng"
    t.string   "state_code"
    t.string   "picture_url"
    t.string   "category"
    t.string   "postal_code"
    t.string   "img1"
    t.string   "img2"
    t.string   "img3"
    t.string   "img4"
    t.string   "img5"
  end

  add_index "businesses", ["category"], name: "index_businesses_on_category", using: :btree
  add_index "businesses", ["city"], name: "index_businesses_on_city", using: :btree
  add_index "businesses", ["hours"], name: "index_businesses_on_hours", using: :btree
  add_index "businesses", ["lat"], name: "index_businesses_on_lat", using: :btree
  add_index "businesses", ["lng"], name: "index_businesses_on_lng", using: :btree
  add_index "businesses", ["name"], name: "index_businesses_on_name", using: :btree
  add_index "businesses", ["price"], name: "index_businesses_on_price", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.text     "body"
    t.float    "rating"
    t.integer  "user_id",      null: false
    t.integer  "business_id",  null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "user_profile"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "profile_url"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
