const React = require('react');
const FilterActions = require('../actions/filter_actions');
const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const DropdownButton = require('react-bootstrap').DropdownButton;
const MenuItem = require('react-bootstrap').MenuItem;
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../stores/session_store');

const Autosuggest = require('react-autosuggest');
const foodTypes = require('../constants/food_types');

const Filters = React.createClass({
  priceChanged(e) {
    FilterActions.updatePrice(parseInt(e.target.value));
  },
  reviewChanged(e) {
    e = e === this.props.filterParams.review ? "" : e;
    FilterActions.updateReview(e);
  },
  reviewCountChanged(e) {
    e = e === this.props.filterParams.reviewCount ? "" : e;
    FilterActions.updateReviewCount(e);
  },
  _createBusiness() {
    if(SessionStore.isUserLoggedIn()) {
      hashHistory.push('/business/new');
    } else {
      setTimeout(()=>{
        $("#login").click();
        $("#login-input").focus();
        $(".login-form-box").prepend('<span id="require-login">Please Login</span>');
      }, 100);
    }
  },

  render() {
    const that = this;
    const prices = [1,2,3,4].map((price) => {
      const selected = that.props.filterParams.prices &&
      that.props.filterParams.prices.includes(price);
      return <Button className="filter-buttons" key={price}
        active={selected} value={price}>{"$".repeat(price)}</Button>;
    });

    const reviewCounts = [1000, 200, 1].map((count) => {
      const selected = count === that.props.filterParams.reviewCount;
      return <MenuItem key={count} active={selected}
        eventKey={count}>{count}+</MenuItem>;
    });

    const reviewRatings = [4, 3, 2].map((rating) => {
      const selected = rating === that.props.filterParams.review;
      return <MenuItem key={rating} active={selected}
        eventKey={rating}>{"★".repeat(rating)}+</MenuItem>;
    });

    return (
      <ButtonToolbar className="button-toolbar">
        <ButtonGroup className="button-group" onClick={this.priceChanged} >
          {prices}
        </ButtonGroup>

        <DropdownButton className="filter-buttons" onSelect={this.reviewChanged}
          title={"★".repeat(this.props.filterParams.review) || "Stars"}
          id="bg-nested-dropdown">
          {reviewRatings}
        </DropdownButton>

        <DropdownButton className="filter-buttons"
          onSelect={this.reviewCountChanged}
          title={this.props.filterParams.reviewCount || "# Review"}
          id="bg-nested-dropdown">
          {reviewCounts}
        </DropdownButton>

        <Button bsStyle="success" onClick={this._createBusiness}>New Business</Button>
      </ButtonToolbar>
    );
  }
});

module.exports = Filters;
