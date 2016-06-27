# Phase 5: Businesses and Garbage Collection

## Rails
### Models
* Business

### Controllers
* Api::BusinessesController (create, destroy, index, show, update)

### Views
* reminders/index.json.jbuilder

## Flux
### Views (React Components)
* BusinessesIndex
  - BusinessIndexItem
* BusinessShow
* BusinessForm

### Stores
* Business

### Actions
* ApiActions.receiveAllBusinesses -> triggered by ApiUtil
* ApiActions.receiveSingleBusiness
* ApiActions.deleteBusiness
* BusinessActions.fetchAllBusinesses -> triggers ApiUtil
* BusinessActions.fetchSingleBusiness
* BusinessActions.createBusiness
* BusinessActions.updateBusiness
* BusinessActions.destroyBusiness

### ApiUtil
* ApiUtil.fetchAllBusinesses
* ApiUtil.fetchSingleBusiness
* ApiUtil.createBusiness
* ApiUtil.updateBusiness
* ApiUtil.destroyBusiness

## Gems/Libraries
