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
      suggestions
    });
  },
  categoryChanged(e) {
    FilterActions.updateCategory(e.target.value);
  },
  // locationChanged(e) {
  //   FilterActions.updateLocation(e.target.value);
  // },
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
    $('#title-splash').animate({opacity: 0},500, 'swing',
    () => {$('#title-splash').remove();});
  },

  render() {
    const that = this;
    //Autosuggest
    const { value, suggestions, noSuggestions } = this.state;
    const inputProps = {
      placeholder: "taco, american, pizza, asian",
      onFocus: this.removeSplash,
      value,
      onChange: this.onChange
    };

    return (
      <div className="search-bars">
        <Autosuggest suggestions={suggestions}
                     id= "search-bar"
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        <input type="text" id="location-search"
          placeholder="SF, LA, New York"
          onFocus={this.removeSplash}
          />
      </div>
    );
  }
});

module.exports = Search;
