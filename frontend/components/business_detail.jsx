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
    const reviewCount = reviews.length;
    const reviewAverage = (reviews.map((review) => {
      return review.rating}).reduce((c,p) => {return c+p})) / reviewCount

    let reviewText = "no reviews yet";
    if(reviews.length > 0) {
      reviewText = reviews.map( (review) => {
        return <Review key={review.id} {...review} />;
      });
    }
    return (
      <div>
        <ul className="business-list">
          <img className="index-image" src={this.props.business.picture_url}/>
          <li>Rating: {reviewAverage || "No reviews yet"}</li>
          <li>ReviewCount: {reviewCount || 0 }</li>
          <li>Description: {this.props.business.description || "No description yet"}</li>
          <li>Price: {this.props.business.price || "No price yet"}</li>
          <li>Latitude: {this.props.business.lat}</li>
          <li>Longitude: {this.props.business.lng}</li>
          <li>Address: {this.props.business.address || "No address yet"}</li>
          <li>City: {this.props.business.city}</li>
          <li>Zipcode: {this.props.business.postal_code}</li>
          <li>State: {this.props.business.state_code}</li>
          <li>Category: {this.props.business.category}</li>
          <li>Health Score: {this.props.business.health_score || "No health score yet"}</li>
        </ul>
        <br/>
        <div className="reviews">
          <h3>Reviews</h3>
          { reviewText }
        </div>
      </div>
    );
  }
});

module.exports = Business;
