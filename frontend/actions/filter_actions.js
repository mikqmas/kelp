const AppDispatcher = require('../dispatcher/dispatcher');
const FilterConstants = require('../constants/filter_constants');

const FilterActions = {
  updateBounds(bounds) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_BOUNDS,
      bounds: bounds
    });
  },
  updatePrice(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_PRICE,
      price: value,
    });
  },
  updateCategory(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_CATEGORY,
      category: value,
    });
  },
  updateLocation(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_LOCATION,
      loc: value,
    });
  },

  updateReview(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_REVIEW,
      review: value,
    });
  },

  updateReviewCount(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_REVIEW_COUNT,
      reviewCount: value,
    });
  },
};

module.exports = FilterActions;
