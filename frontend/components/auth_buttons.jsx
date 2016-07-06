//React
const React = require('react');
const DropdownButton = require('react-bootstrap').DropdownButton;

//Components
const Search = require('./search');
const HeaderAuth = require('./login_form');

//Actions
const SessionActions = require('../actions/session_actions');

//Stores
const SessionStore = require('../stores/session_store');



const AuthButtons = React.createClass({
  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  _handleLogOut(){
    SessionActions.logOut();
  },

  greeting() {
    if (SessionStore.isUserLoggedIn()) {
    	return (
    		<hgroup className="header-group">
    			<h3 className="header-name">Hi, {SessionStore.currentUser().username}!</h3>
    			<input className="header-button" type="submit" value="logout" onClick={ this._handleLogOut } />
    		</hgroup>
    	);
    } else {
      return (
        <nav className="login-signup">
          <DropdownButton pullRight title="Login" className="loginandsign">
            <HeaderAuth auth="login"/>
          </DropdownButton>

          <DropdownButton pullRight title="Signup" className="loginandsign">
            <HeaderAuth auth="signup"/>
          </DropdownButton>
        </nav>
      );
    }
  },

  render() {
    return(
      <div className="auth-buttons">
        { this.greeting() }
      </div>
    );
  }
});

module.exports = AuthButtons;
