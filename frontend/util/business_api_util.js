const ApiUtil = {
  fetchAllBusinesses(filters, success){
    $.get('api/businesses', filters, success);
  },
  createBusiness(data, success){
    $.post('api/businesses', { business: data }, success);
  },
  createReview(review, success) {
    $.post('api/reviews', { review }, success);
  }
};

module.exports = ApiUtil;
