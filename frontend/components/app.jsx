const React = require('react');
const Header = require('./header');

const App = React.createClass({

  render() {
    return (
        <div className="main-body">
          <Header pathname={this.props.location.pathname}/>
          {this.props.children}
        </div>
    );
  }
});

module.exports = App;
