//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const DropdownButton = require('react-bootstrap').DropdownButton;

//Components
const Search = require('./search');
const HeaderAuth = require('./login_form');

//Actions
const SessionActions = require('../actions/session_actions');

//Stores
const FilterParamsStore = require('../stores/filter_params_store');
const SessionStore = require('../stores/session_store');



const Header = React.createClass({
  getInitialState() {
    return {
      filterParams: FilterParamsStore.params()
    };
  },

  componentDidMount() {
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  _handleLogOut(){
    SessionActions.logOut();
  },

  greeting() {
    if (SessionStore.isUserLoggedIn()) {
    	return (
    		<hgroup className="header-group">
    			<h2 className="header-name">Hi, {SessionStore.currentUser().username}!</h2>
    			<input className="header-button" type="submit" value="logout" onClick={ this._handleLogOut } />
    		</hgroup>
    	);
    } else {
      return (
        <nav className="login-signup">
          <DropdownButton title="Login">
            <HeaderAuth auth="login"/>
          </DropdownButton>

          <DropdownButton title="Signup">
            <HeaderAuth auth="signup"/>
          </DropdownButton>
        </nav>
      );
    }
  },

  _filtersChanged() {
    const newFilters = FilterParamsStore.params();
    this.setState({filterParams: newFilters});
  },

  componentWillUnmount() {
    this.filterListener.remove();
  },

  render() {
    return(
      <div className="main-header">
          <img src="http://placekitten.com/50/50" />
        <div className="search-and-session">
          <Search filterParams={this.state.filterParams}/>
          { this.greeting() }
        </div>
      </div>
    );
  }
});

module.exports = Header;
