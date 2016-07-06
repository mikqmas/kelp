const React = require('react');
const Link = require('react-router').Link;
const Review = require('./review');
const SessionStore = require('../stores/session_store');

var Business = React.createClass({
  getInitialState() {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this._userChanged);
  },

  _userChanged() {
    this.setState({current_user: SessionStore.currentUser() });
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },


  render() {
    const reviews = this.props.business.reviews || [];

    let reviewText = "no reviews yet";
    if(reviews.length > 0) {
      reviewText = reviews.map( (review) => {
        return <Review key={review.id} {...review} />;
      });
    }
    let stars;
    const numReviews = this.props.business.review_count;
    const reviewAvg = this.props.business.average_rating
    if(numReviews === 0) {
      stars = "";
    }else {
      stars = "★".repeat(Math.floor(reviewAvg));
      if((reviewAvg % 1 * 10) > 4){
        stars += "½";
      }
    }
    return (
      <div>
        <div className="quick-summary">
          <div className="head-title">
          <h1>{this.props.business.name}</h1>
          </div>
          <img className="index-image" src={this.props.business.picture_url}/>
          <h3>{ stars } {numReviews || 0 } Reviews</h3>
          <li>Price: {this.props.business.price || "No price yet"}</li>
          <li>{this.props.business.category}</li>
        </div>

          <li>Description: {this.props.business.description || "No description yet"}</li>
          <li>Address: {this.props.business.address || "No address yet"}</li>
          <li>City: {this.props.business.city}</li>
          <li>Zipcode: {this.props.business.postal_code}</li>
          <li>State: {this.props.business.state_code}</li>
          <li>Health Score: {this.props.business.health_score || "No health score yet"}</li>
        <div className="reviews">
          <h3>Reviews</h3>
          { reviewText }
        </div>
      </div>
    );
  }
});

module.exports = Business;
