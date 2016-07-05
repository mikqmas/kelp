const React = require('react');
const FilterActions = require('../actions/filter_actions');
const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const DropdownButton = require('react-bootstrap').DropdownButton;
const MenuItem = require('react-bootstrap').MenuItem;

const Autosuggest = require('react-autosuggest');
const foodTypes = require('../constants/food_types');

//Autosuggest
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return foodTypes.filter(foodType => regex.test(foodType.name));
}

function getSuggestionValue(suggestion) {
  console.log("getSUGESTIONVALUE");
  FilterActions.updateCategory(suggestion.name);
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

//Geocoder
const geocoder = new google.maps.Geocoder();
let suggestedCities = [];

const Filters = React.createClass({
  getInitialState() {
    return({
      value: '',
      suggestions: getSuggestions(''),
      noSuggestions: false
    });
  },
  onChange(event, { newValue, method }) {
    console.log("HERE");
    this.setState({
      value: newValue
    });
    FilterActions.updateCategory(event.target.value);
  },
  onSuggestionsUpdateRequested({ value }) {
    const suggestions = getSuggestions(value);
    const isInputBlank = value.trim() === '';
    const noSuggestions = !isInputBlank && suggestions.length === 0;

    this.setState({
      suggestions,
      noSuggestions
    });
  },
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

    //Autosuggest
    const { value, suggestions, noSuggestions } = this.state;
    const inputProps = {
      placeholder: "tacos, american, takeout, pizza, asian",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest className="search-bar"
                     suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        {
          noSuggestions
        }

        <input type="text"
          onChange={this.locationChanged}
          value={this.currentLocation()}/>

        <div>
          {suggestedCities}
        </div>

        <ButtonToolbar>
          <ButtonGroup onClick={this.priceChanged} >
            {prices}
          </ButtonGroup>

          <DropdownButton onSelect={this.reviewChanged}
            title={"★".repeat(this.props.filterParams.review) || "Stars"}
            id="bg-nested-dropdown">
            {reviewRatings}
          </DropdownButton>

          <DropdownButton onSelect={this.reviewCountChanged}
            title={this.props.filterParams.reviewCount || "Review Count"}
            id="bg-nested-dropdown">
            {reviewCounts}
          </DropdownButton>
        </ButtonToolbar>

    </div>
    );
  }
});

module.exports = Filters;
