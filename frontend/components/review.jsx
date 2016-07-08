"use strict";

const React = require('react');

var Review = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li>{"★".repeat(this.props.rating)}</li>
          <li>{this.props.body}</li>
        </ul>
      </div>
    );
  }
});

module.exports = Review;
