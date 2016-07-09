const React = require('react');
const hashHistory = require('react-router').hashHistory;
const BusinessActions = require('../actions/business_actions');
const SessionStore = require('../stores/session_store');

const ReviewForm = React.createClass({
  getInitialState() {
    return { rating: 0, body: "" };
  },

  navigateToBusinessShow() {
    const businessUrl = "/businesses/" + this.props.params.businessId;
    hashHistory.push(businessUrl);
  },

  handleCancel(event) {
    event.preventDefault();
    this.navigateToBusinessShow();
  },

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.rating === 0) {
      $(".review-form").prepend("<span style='color: red'>Please add a rating.</span>");
      return;
    }
    const review = Object.assign(
      {},
      this.state,
      { business_id: this.props.params.businessId },
      { user_id: SessionStore.currentUser().id }
    );
    BusinessActions.createReview(review);
    this.navigateToBusinessShow();
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  _setRating(e) {
    this.setState({rating: parseInt(e.target.value)});
  },

  render() {
    return (
      <div className="review-form">
        <form onSubmit={this.handleSubmit}>
          <div className="star-group">
            <span className="star-rating" id="star5" value="5" onClick={this._setRating}
              style={{color: this.state.rating === 5 ? 'yellow' : 'gray'}}>★</span>
            <span className="star-rating" id="star4" value="4" onClick={this._setRating}
              style={{color: this.state.rating >= 4 ? 'yellow' : 'gray'}}>★</span>
            <span className="star-rating" id="star3" value="3" onClick={this._setRating}
              style={{color: this.state.rating >= 3 ? 'yellow' : 'gray'}}>★</span>
            <span className="star-rating" id="star2" value="2" onClick={this._setRating}
              style={{color: this.state.rating >= 2 ? 'yellow' : 'gray'}}>★</span>
            <span className="star-rating" id="star1" value="1" onClick={this._setRating}
              style={{color: this.state.rating >= 1 ? 'yellow' : 'gray'}}>★</span>
          </div>
          <label>Comment</label>
          <br/>
          <textarea
            id="review-form"
            cols='30'
            rows='10'
            value={this.state.body}
            onChange={this.update("body")}></textarea>
          <br/>
          <input type="submit"/>
          <button onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
 }
});

module.exports = ReviewForm;
