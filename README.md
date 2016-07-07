# Kelp

Yelp API: https://api.yelp.com/v2/search?term=food&location=San+Francisco&oauth_consumer_key=SeiwYq9KW9sedsZUd9d8Yg&oauth_consumer_secret=ZPegLm0ar4eqsXHwF6CsMYWXtZE&oauth_token=dHPVjDLbJGPDwDRitcHK5cfuOL5fqNCe&oauth_token_secret=v3M4B1kGPZ6rutrOMJhwcIDbTBk&oauth_signature_method=HMAC-SHA1&oauth_timestamp=temstamp_value&oauth_nonce=nonce_value&oauth_signature=signature_value

[Heroku link][heroku]

[heroku]: https://k3lp.herokuapp.com/

## Minimum Viable Product

Kelp is a web application inspired by Yelp that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [X] Hosting on Heroku
- [X] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [X] Business Page
  - [X] Intuitive business profile layout taking cues from FB
  - [ ] Populate using Yelp api to demonstrate the site's features
  - [X] Adequate CSS styling
- [ ] Search / filters
  - [X] Intuitive searching and filtering options
  - [X] Quick async ajax, bug-free search
  - [ ] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [ ] Reviews / ratings
  - [ ] Easy to use review form using react-quill
  - [ ] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [X] Map
  - [X] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

* [Phase one][phase-one]

**Objective:** Functioning rails project with Authentication

- [X] create new project
- [X] create `User` model
- [X] authentication
- [X] user signup/signin pages
- [X] blank landing page after signin

### Phase 2: Review Model, API, and basic APIUtil (1.5 days, W1 Th 12pm)

* [Phase two][phase-two]

**Objective:** Reviews can be created, read, edited and destroyed through
the API.

- [X] create `Review` model
- [X] seed the database with a small amount of test data
- [X] CRUD API for Review (`ReviewsController`)
- [X] jBuilder views for reviews
- [X] setup Webpack & Flux scaffold
- [X] setup `APIUtil` to interact with the API
- [X] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

* [Phase three][phase-three]

**Objective:** Reviews can be created, read, edited and destroyed with the
user interface.

- [X] setup the flux loop with skeleton files
- [X] setup React Router
- implement each review component, building out the flux loop as needed.
  - [X] `ReviewsIndex`
  - [X] `ReviewIndexItem`
  - [X] `ReviewForm`
- [X] save Reviews to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days, W2 M 12pm)

* [Phase four][phase-four]

**Objective:** Existing pages (including signup/signin) will look good.

- [X] create a basic style guide
- [X] position elements on the page
- [X] add basic colors & styles

### Phase 5: Businesses (1 day, W2 Tu 12pm)

* [Phase five][phase-five]

**Objective:** Reviews belong to Businesses, and can be viewed by Business.

- [X] create `Business` model
- build out API, Flux loop, and components for:
  - [X] Business CRUD
  - [X] adding reviews requires a business
  - [X] viewing reviews by business
- Use CSS to style new reviews

Phase 3 adds organization to the Review. Reviews belong to a Business,
which has its own `Index` view.

### Phase 6: Tags (1 days, W2 Th 12pm)

**Objective:** Reviews can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for reviews
  - [ ] adding tags to reviews
  - [ ] creating tags while adding to reviews
  - [ ] searching reviews by tag
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Reviews (0.5 days, W2 Th 6pm)

**objective:** Enable complex styling of reviews.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Mark reviews funny, cool, useful etc.
- [ ] Search through reviews for blocks of text
- [ ] Pagination / infinite scroll for Business Index
- [ ] Profile
- [ ] Friends
- [ ] Multiple sessions


[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
