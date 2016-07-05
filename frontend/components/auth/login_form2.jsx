const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;


const LoginForm = React.createClass({

	context: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      username: "",
      password: "",
    };
  },


  componentDidMount() {
		this.redirectIfLoggedIn();
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
		this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
		this.errorListener.remove();
    this.sessionListener.remove();
  },

	redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      hashHistory.push('/');
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			username: this.state.username,
			password: this.state.password
		};

    if (this.props.location.pathname === "/login") {
      SessionActions.logIn(formData);
    } else {
      SessionActions.signUp(formData);
    }
	},

	fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.formType());

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  formType() {
    return this.props.location.pathname.slice(1);
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
	loginGuest(e){
		e.preventDefault();
		SessionActions.loginGuest();
	},


	render() {

    let navLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">sign up instead</Link>;
    } else {
      navLink = <Link to="/login">log in instead</Link>;
    }

		return (
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="login-form-box">
	        Welcome to Kelp!
					<br/>
					Please { this.formType() } or { navLink }

					{ this.fieldErrors("base") }
					<div className="login-form">
		        <br />
						{ this.fieldErrors("username") }
						<label> Username:
							<input type="text"
		            value={this.state.username}
		            onChange={this.update("username")}
								className="login-input" />
						</label>

		        <br />
						{ this.fieldErrors("password") }
						<label> Password:
		          <input type="password"
		            value={this.state.password}
		            onChange={this.update("password")}
								className="login-input" />
						</label>

		        <br />
						<input type="submit" value="Submit" />
	        	<button onClick={this.loginGuest}>Login as Guest</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = LoginForm;
