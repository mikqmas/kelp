const React = require('react');
const FilterActions = require('../actions/filter_actions');

const Filters = React.createClass({
  priceChanged(e) {
    FilterActions.updatePrice(e.target.value);
  },
  categoryChanged(e) {
    FilterActions.updateCategory(e.target.value);
  },
  reviewChanged(e) {
    FilterActions.updateReview(e.target.value);
  },
  reviewCountChanged(e) {
    FilterActions.updateReviewCount(e.target.value);
  },

  currentPrice() {
    return this.props.filterParams.price || "";
  },
  currentCategory() {
    return this.props.filterParams.category || "";
  },
  currentReview() {
    return this.props.filterParams.review || "";
  },
  currentReviewCount() {
    return this.props.filterParams.reviewCount || "";
  },

  updatePrice(price) {
    FilterActions.updateParams({
      price: { price }
    });
  },

  render() {
    return (
      <div>
        <span className="filter">Filter results:</span>
        <br/>
        <label>Category </label>
        <input type="text"
          onChange={this.categoryChanged}
          value={this.currentCategory()}/>
         <br/>
        <label>Price </label>
        <input type="number"
          min="" max="5"
          onChange={this.priceChanged}
          value={this.currentPrice()}/>

       <br/>
      <label>Review </label>
      <input type="number"
        min="1" max="5"
        onChange={this.reviewChanged}
        value={this.currentReview()}/>

       <br/>
      <label>Review Count</label>
      <input type="number"
        min="0" 
        onChange={this.reviewCountChanged}
        value={this.currentReviewCount()}/>
      </div>
    );
  }
});

module.exports = Filters;
