# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Reviews

- `GET /api/reviews`
  - Reviews index/search
  - accepts `tag_name` query param to list reviews by tag
  - accepts pagination params (if I get there)
- `POST /api/reviews`
- `GET /api/reviews/:id`
- `PATCH /api/reviews/:id`
- `DELETE /api/reviews/:id`

### Businesses

- `GET /api/businesses`
- `POST /api/businesses`
- `GET /api/businesses/:id`
- `PATCH /api/businesses/:id`
- `DELETE /api/businesses/:id`
- `GET /api/businesses/:id/reviews`
  - index of all reviews for a business
  - accepts pagination params (if I get there)

### Tags

- A business's tags will be included in the business show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/businesses/:business_id/tags`: add tag to business by name
  - if business doesn't already exist, it will be created
- `DELETE /api/businesses/:business_id/tags/:tag_name`: remove tag from business by
  name
