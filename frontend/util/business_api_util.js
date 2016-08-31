// debounce
var apiCall = null;
var timeout;

const ApiUtil = {
  fetchAllBusinesses(filters, success){
    clearTimeout(timeout);
    if(!apiCall){ apiCall.abort(); }
    timeout = setTimeout(function(){
      apiCall = $.get('api/businesses', filters, success);
    }, 200);
  },
  createBusiness(data, success){
    $.post('api/businesses', { business: data }, success);
  },
  createReview(review, success) {
    $.post('api/reviews', { review }, success);
  },
};

module.exports = ApiUtil;
