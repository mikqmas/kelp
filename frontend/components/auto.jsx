const React = require('react');
const Autosuggest = require('react-autosuggest');
const FilterActions = require('../actions/filter_actions');

const languages = [
{name: "Soul Food"},
{name: "Southern Food"},
{name: "Japanese"},
{name: "Asian"},
{name: "African"},
{name: "Russian"},
{name: "South American"},
{name: "Mexican"},
{name: "Hispanic"},
{name: "Korean"},
{name: "Chinese"},
{name: "American"},
{name: "Italian"},
{name: "Irish"},
{name: "British"},
{name: "Ethiopian"},
{name: "Fast Food"},
{name: "hamburger"},
{name: "burger"},
{name: "pasta"},
{name: "ramen"},
{name: "sushi"},
{name: "bibimbap"},
{name: "taco"},
{name: "burrito"},
{name: "steak"},
{name: "chicken"},
{name: "lamb"},
{name: "bbq"},
{name: "catering"},
{name: "lunch"},
{name: "fried chicken"},
{name: "Arab"},
{name: "Armenian"},
{name: "Assyrian"},
{name: "Balochi"},
{name: "Berber"},
{name: "Buddhist"},
{name: "Bulgarian"},
{name: "Cajun"},
{name: "Circassian"},
{name: "French"},
{name: "Greek"},
{name: "Jewish"},
{name: "Kurdish"},
{name: "Malayali"},
{name: "Louisiana Creole"},
{name: "Malay cuisine"},
{name: "Persian cuisine"},
{name: "Punjabi"},
{name: "Rajasthani"},
{name: "Russian"},
{name: "Sami"},
{name: "Sindhi"},
{name: "Tatar"},
{name: "Turkish"},
{name: "Yamal"},
{name: "Zanzibari"},
{name: "South Indian"},
];

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

  return languages.filter(language => regex.test(language.name));
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
