const React = require('react');
const FilterActions = require('../actions/filter_actions');

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
    <span className="suggestions">{suggestion.name}</span>
  );
}

const Search = React.createClass({
  getInitialState() {
    return({
      value: '',
      suggestions: getSuggestions(''),
      noSuggestions: false
    });
  },
  onChange(event, { newValue, method }) {
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
  categoryChanged(e) {
    FilterActions.updateCategory(e.target.value);
  },
  locationChanged(e) {
    // const address = e.target.value;
    // geocoder.geocode( { 'address' : address, 'region' : 'us',
    //   componentRestrictions: {country: 'US'}},
    // function( results, status ) {
    //   if( status === google.maps.GeocoderStatus.OK ) {
    //   }
    // });
    FilterActions.updateLocation(e.target.value);
  },
  currentCategory() {
    return this.props.filterParams.category || "";
  },
  currentLocation() {
    return this.props.filterParams.loc || "";
  },
  removeSplash() {
    $('video').animate({
      opacity: 0
    }, 500, 'swing', () => {$('video').remove();});
  },

  render() {
    const that = this;
    //Autosuggest
    const { value, suggestions, noSuggestions } = this.state;
    const inputProps = {
      placeholder: "tacos, american, takeout, pizza, asian",
      value,
      onChange: this.onChange
    };

    return (
      <div className="search-bars">
        <Autosuggest suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        {
          noSuggestions
        }

        <input type="text" id="location-search"
          placeholder="SF, San Francisco, Chicago, LA"
          onChange={this.locationChanged}
          onClick={this.removeSplash}
          value={this.currentLocation()}/>
      </div>
    );
  }
});

module.exports = Search;
