# Phase 3: Businesses and Tags (2 days)

## Rails
### Models
* Business
* Tag
* Tagging

### Controllers
* Api::BusinessesController (create, destroy, index, show, update)

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* BusinessesIndex
  - BusinessIndexItem
* BusinessForm
* SearchIndex

### Stores
* Business

### Actions
* ApiActions.receiveAllBusinesses -> triggered by ApiUtil
* ApiActions.receiveSingleBusiness
* ApiActions.deleteBusiness
* BusinessActions.fetchAllBusinesses -> triggers ApiUtil
* BusinessActions.fetchSingleBusiness
* BusinessActions.createBusiness
* BusinessActions.editBusiness
* BusinessActions.destroyBusiness

### ApiUtil
* ApiUtil.fetchAllBusinesses
* ApiUtil.fetchSingleBusiness
* ApiUtil.createBusiness
* ApiUtil.editBusiness
* ApiUtil.destroyBusiness

## Gems/Libraries
