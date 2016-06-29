"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const BusinessConstants = require('../constants/business_constants');
const BusinessApiUtil = require('../util/business_api_util');

const BusinessActions = {
  fetchAllBusinesses() {
    BusinessApiUtil.fetchAllBusinesses(BusinessActions.receiveAllBusinesses);
  },
  createBusiness(business){
    BusinessApiUtil.createBusiness(business, BusinessActions.receiveSingleBusiness);
  },
  createReview(review){
    BusinessApiUtil.createReview(review, BusinessActions.receiveSingleBusiness);
  },

  receiveAllBusinesses(businesses) {
    AppDispatcher.dispatch({
      actionType: BusinessConstants.BUSINESSES_RECEIVED,
      businesses: businesses
    });
  },
  receiveSingleBusiness(business) {
    AppDispatcher.dispatch({
      actionType: BusinessConstants.BUSINESS_RECEIVED,
      business: business
    });
  }
};

module.exports = BusinessActions;
