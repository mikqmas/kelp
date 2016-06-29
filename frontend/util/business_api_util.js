const ApiUtil = {
  fetchAllBusinesses(success){
    $.get('api/businesses', success);
  },
  createBusiness(data, success){
    $.post('api/businesses', { business: data }, success);
  },
  createReview(review, success) {
    $.post('api/reviews', { review }, success);
  }
};

module.exports = ApiUtil;
