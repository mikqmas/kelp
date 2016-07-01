const React = require('react');
const FilterActions = require('../actions/filter_actions');
const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const DropdownButton = require('react-bootstrap').DropdownButton;
const MenuItem = require('react-bootstrap').MenuItem;

//Geocoder
const geocoder = new google.maps.Geocoder();
let suggestedCities = ["hello"];

const Filters = React.createClass({
  priceChanged(e) {
    FilterActions.updatePrice(parseInt(e.target.value));
  },
  categoryChanged(e) {
    FilterActions.updateCategory(e.target.value);
  },
  locationChanged(e) {
    const address = e.target.value;
    geocoder.geocode( { 'address' : address, 'region' : 'us',
      componentRestrictions: {country: 'US'}},
    function( results, status ) {
      if( status === google.maps.GeocoderStatus.OK ) {
        suggestedCities = [];
        results.forEach((result) => {
          if(result.address_components[0].types[0] === "locality" &&
            !suggestedCities.includes(result.address_components[0].long_name)) {
              suggestedCities.push(result.address_components[0].long_name);
          }
        });
      }
    });
    FilterActions.updateLocation(e.target.value);
  },
  reviewChanged(e) {
    e = e === this.props.filterParams.review ? "" : e;
    FilterActions.updateReview(e);
  },
  reviewCountChanged(e) {
    e = e === this.props.filterParams.reviewCount ? "" : e;
    FilterActions.updateReviewCount(e);
  },
  //
  // currentPrices() {
  //   return this.props.filterParams.prices || "";
  // },
  currentCategory() {
    return this.props.filterParams.category || "";
  },
  currentLocation() {
    return this.props.filterParams.loc || "";
  },
  // currentReview() {
  //   return this.props.filterParams.review || "";
  // },
  // currentReviewCount() {
  //   return this.props.filterParams.reviewCount || "";
  // },

  // updatePrices(price) {
  //   FilterActions.updateParams({
  //     price: { price }
  //   });
  // },

  render() {
    const that = this;
    const prices = [1,2,3,4].map((price) => {
      const selected = that.props.filterParams.prices && that.props.filterParams.prices.includes(price);
      return <Button key={price} active={selected} value={price}>{"$".repeat(price)}</Button>;
    });

    const reviewCounts = [1000, 200, 1].map((count) => {
      const selected = count === that.props.filterParams.reviewCount;
      return <MenuItem key={count} active={selected} eventKey={count}>{count}+</MenuItem>;
    });

    const reviewRatings = [4, 3, 2].map((rating) => {
      const selected = rating === that.props.filterParams.review;
      return <MenuItem key={rating} active={selected} eventKey={rating}>{"★".repeat(rating)}+</MenuItem>;
    });
    return (
      <div>
        <span className="filter">Filter By:</span>
        <br/>
        <ButtonToolbar>
          <label>Price </label>
          <ButtonGroup onClick={this.priceChanged} >
            {prices}
          </ButtonGroup>

          <label>Average Review </label>
          <DropdownButton onSelect={this.reviewChanged}
            title={"★".repeat(this.props.filterParams.review) || "Stars"}
            id="bg-nested-dropdown">
            {reviewRatings}
          </DropdownButton>

          <label>Review Count </label>
          <DropdownButton onSelect={this.reviewCountChanged}
            title={this.props.filterParams.reviewCount || "Review Count"}
            id="bg-nested-dropdown">
            {reviewCounts}
          </DropdownButton>
        </ButtonToolbar>

        <label>Search </label>
        <input type="text"
          onChange={this.categoryChanged}
          value={this.currentCategory()}/>

        <label>Location </label>
        <input type="text"
          onChange={this.locationChanged}
          value={this.currentLocation()}/>

        <div>
          {suggestedCities}
        </div>

    </div>
    );
  }
});

//    <br/>
//   <label>Price </label>
//   <input type="number"
//     min="" max="5"
//     onChange={this.priceChanged}/>
//
//  <br/>
// <label>Review </label>
// <input type="number"
//   min="1" max="5"
//   onChange={this.reviewChanged}
//   value={this.currentReview()}/>
//
//  <br/>
// <label>Review Count</label>
// <input type="number"
//   min="0"
//   onChange={this.reviewCountChanged}
//   value={this.currentReviewCount()}/>

module.exports = Filters;
