const Store = require('flux/utils').Store;
const BusinessConstants = require('../constants/business_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const BusinessStore = new Store(AppDispatcher);
let _businesses = {};

window.BusinessStore = BusinessStore;

BusinessStore.all = function(){
  return Object.assign({}, _businesses);
};

BusinessStore.find = function(id){
  return Object.assign({}, _businesses[id]);
};

function resetAllBusinesses(businesses){
  _businesses = businesses;
  BusinessStore.__emitChange();
}

function resetSingleBusiness(business){
  _businesses[business.id] = business;
  BusinessStore.__emitChange();
}

BusinessStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case BusinessConstants.BUSINESSES_RECEIVED:
      resetAllBusinesses(payload.businesses);
      break;
    case BusinessConstants.BUSINESS_RECEIVED:
      resetSingleBusiness(payload.business);
      break;
  }
};

module.exports = BusinessStore;
