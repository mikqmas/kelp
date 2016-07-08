const React = require('react');
const Link = require('react-router').Link;
const Review = require('./review');
const SessionStore = require('../stores/session_store');
const foodImages = require('../constants/food_images');

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
  changePicture() {
    $("#business-image").hide();
    $("#loadIcon").show();
    $("#business-image").load(function() {
      $("#loadIcon").hide();
      $("#business-image").show();
    }).attr('src', 'https://i.imgur.com/' + foodImages[Math.floor(Math.random() * foodImages.length)] + '.jpg)');
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
    const reviewAvg = this.props.business.average_rating;

    if(numReviews === 0) {
      stars = "";
    }else {
      stars = "★".repeat(Math.floor(reviewAvg));
      if((reviewAvg % 1 * 10) > 4){
        stars += "½";
      }
    }
    return (
      <div className="business-detail-main">
        <div className="business-image">
          <div className="arrow" onClick={this.changePicture}>
            ◀ </div>
          <div id="loadIcon"><img src="images/loading.gif" /></div>
          <div className="arrow" onClick={this.changePicture}>
            ▶ </div>
          <img id="business-image" src={'https://i.imgur.com/' +
            foodImages[Math.floor(Math.random() * foodImages.length)] + '.jpg)'}></img>
        </div>
        <div className="summary-reviews">
        <div className="quick-summary">
          <div className="head-title">
          <h1>{this.props.business.name}</h1>
          </div>
          <h3>{ stars } {numReviews || 0 } Reviews</h3>
          <div className="quick-info">
            <span>Price: {"$".repeat(this.props.business.price) || "No price yet"}</span>
            <span><span aria-hidden="true" data-icon="◈"></span>
              {this.props.business.category || "No categories yet"}</span>
            <span><span aria-hidden="true" data-icon="☎"></span>
              {this.props.business.phone || "No phone # yet"}</span>
            <span><span aria-hidden="true" data-icon="✖"></span>
              {this.props.business.address}</span>
            <span><span aria-hidden="true" data-icon="☛"></span>
              <a href={"http://maps.google.com?q=" + this.props.business.address}
                target="_blank">
              Get Directions</a></span>
            <span className="business-description">
              {this.props.business.description || "No description yet"}</span>
          </div>
        </div>
            <div className="reviews">
              <h3>Reviews</h3>
              { reviewText }
            </div>
      </div>


      </div>
    );
  }
});

module.exports = Business;
