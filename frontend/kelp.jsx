//React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
//Components
const Splash = require('./components/splash');
const LoginForm = require('./components/login_form');
const BusinessForm = require('./components/business_form');
const BusinessShow = require('./components/business_show');
const ReviewForm = require('./components/review_form');
//Auth
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');


const appRouter = (
  <Router history={ hashHistory }>
      <Route path="/" component={ Splash }>
        <Route path="/business/new" component={ BusinessForm } onEnter={ _ensureLoggedIn }/>
        <Route path="businesses/:businessId" component={ BusinessShow } >
          <Route path="review" component={ ReviewForm } onEnter={ _ensureLoggedIn }/>
        </Route>
      </Route>
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ LoginForm } />

  </Router>
);

function _ensureLoggedIn(nextState, replace) {
  // We don't want users to be able to visit our 'new' or 'review' routes
  // if they haven't already signed in/up. Let's redirect them!
  // `replace` is like a redirect. It replaces the current entry
  // into the history (and the hashFragment), so the Router is forced
  // to re-route.
    if (!SessionStore.isUserLoggedIn()) {
      setTimeout(()=>{
        window.history.back();
        $("#login").click();
        $("#login-input").focus();
        $(".login-form-box").prepend('<span id="require-login">Please Login</span>');
      }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  ReactDOM.render(appRouter, document.getElementById("content"));
});
