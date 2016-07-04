const React = require('react');
const Autosuggest = require('react-autosuggest');
const FilterActions = require('../actions/filter_actions');
const foodTypes = require('../constants/food_types');

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
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
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions(''),
      noSuggestions: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
    FilterActions.updateCategory(event.target.value);
  }

  onSuggestionsUpdateRequested({ value }) {
    const suggestions = getSuggestions(value);
    const isInputBlank = value.trim() === '';
    const noSuggestions = !isInputBlank && suggestions.length === 0;

    this.setState({
      suggestions,
      noSuggestions
    });
  }

  render() {
    const { value, suggestions, noSuggestions } = this.state;
    const inputProps = {
      placeholder: "tacos, american, takeout, pizza, asian",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        {
          noSuggestions
        }
      </div>
    );
  }
}

module.exports = App;
