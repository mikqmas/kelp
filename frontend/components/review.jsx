"use strict";

const React = require('react');

var Review = React.createClass({
  render() {
    return (
      <div className="review-div">
        <img className="review-profile" src={this.props.user_profile} ></img>
        <ul className="single-review">
          <li>{"★".repeat(this.props.rating)}</li>
          <li>{this.props.body}</li>
        </ul>
      </div>
    );
  }
});

module.exports = Review;
