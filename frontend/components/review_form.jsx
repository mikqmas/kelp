const React = require('react');
const hashHistory = require('react-router').hashHistory;
const BusinessActions = require('../actions/business_actions');
const SessionStore = require('../stores/session_store');

const ReviewForm = React.createClass({
  getInitialState() {
    return { rating: 5, body: "" };
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

  render() {
    return (
      <div className="review-form">
        <form onSubmit={this.handleSubmit}>
          <label>Rating</label>
          <br/>
          <input type="number"
            value={this.state.rating}
            onChange={this.update("rating")}/>
          <br/>

          <label>Comment</label>
          <br/>
          <textarea
            cols='30'
            rows='10'
            value={this.state.body}
            onChange={this.update("body")}></textarea>
          <br/>
          <input type="submit"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
 }
});

module.exports = ReviewForm;
