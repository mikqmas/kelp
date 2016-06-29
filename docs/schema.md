# Schema Information

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      |
stars       | float     | not null
author_id   | integer   | not null, foreign key (references users), indexed
business_id | integer   | not null, foreign key (references businesses), indexed
archived    | boolean   | not null, default: false

#business search filterable
tags
city
lat / lng
postal_code
review
review_count
price
category


## businesses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name       | string    | not null
description | string    |
category | string    |
phone       | string    |
address       | string    |
city       | string    |
lat       | double    |
lng       | double    |
postal_code       | integer    |
state_code       | string    |
review      | float     | not null, default: 0.0
review_count      | integer     | not null, default: 0.0


## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
business_id     | integer   | not null, foreign key (references businesses), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
