const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const FilterConstants = require('../constants/filter_constants');

let _params = {};
const FilterParamsStore = new Store(AppDispatcher);

FilterParamsStore.params = function() {
  return Object.assign({}, _params);
};

function setPrice(price){
  if(price === "") {
    delete _params['price'];
  } else {
    _params.price = price;
  }
  FilterParamsStore.__emitChange();
}

function setReview(review){
  if(review === "") {
    delete _params['review'];
  } else {
    _params.review = review;
  }
  FilterParamsStore.__emitChange();
}

function setReviewCount(reviewCount){
  if(reviewCount === "") {
    delete _params['reviewCount'];
  } else {
    _params.reviewCount = reviewCount;
  }
  FilterParamsStore.__emitChange();
}

function setCategory(category){
  if(category === "") {
    delete _params['category'];
  } else {
    _params.category = category;
  }
  FilterParamsStore.__emitChange();
}

function setBounds(bounds){
  _params.bounds = bounds;
  FilterParamsStore.__emitChange();
}

FilterParamsStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case FilterConstants.UPDATE_PRICE:
      setPrice(payload.price);
      break;
    case FilterConstants.UPDATE_REVIEW:
      setReview(payload.review);
      break;
    case FilterConstants.UPDATE_REVIEW_COUNT:
      setReviewCount(payload.reviewCount);
      break;
    case FilterConstants.UPDATE_CATEGORY:
      setCategory(payload.category);
      break;
    case FilterConstants.UPDATE_BOUNDS:
      setBounds(payload.bounds);
      break;
  }
};

module.exports = FilterParamsStore;
