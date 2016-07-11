const React = require('react');
const Review = require('./review');
const SessionStore = require('../stores/session_store');
const foodImages = require('../constants/food_images');

var Business = React.createClass({
  getInitialState() {
    return { currentUser: SessionStore.currentUser(),
              r: Math.floor(Math.random() * (200)),
              g: Math.floor(Math.random() * (200)),
              b: Math.floor(Math.random() * (200)),
              showPic: 1};
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.business.id !== this.props.business.id) {
      this.setState({
                r: Math.floor(Math.random() * (200)),
                g: Math.floor(Math.random() * (200)),
                b: Math.floor(Math.random() * (200))});
    }

    $("#business-image").hide();
    $("#loadIcon").show();
    $("#business-image").load(function() {
      $("#loadIcon").hide();
      $("#business-image").show();
    }).attr('src', this.props.business[`img${this.state.showPic}`]);
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
  changePicture(dir) {
    let nextPic;
    if(dir === "plus"){
      if((this.state.showPic + 1) > 5) {
        nextPic = 1;
      } else {
        nextPic = this.state.showPic + 1;
      }
    } else {
      if((this.state.showPic - 1) < 1) {
        nextPic = 5;
      } else {
        nextPic = this.state.showPic - 1;
      }
    }
    this.setState({showPic: nextPic});
    $("#business-image").hide();
    $("#loadIcon").show();
    $("#business-image").load(function() {
      $("#loadIcon").hide();
      $("#business-image").show();
    }).attr('src', this.props.business[`img${nextPic}`]);
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

    const r = this.state.r;
    const g = this.state.g;
    const b = this.state.b;
    return (
      <div className="business-detail-main">
        <div className="business-image" style={{border: `5px solid rgba( ${r}, ${g}, ${b}, .7)`}}>
          <div className="arrow" onClick={this.changePicture.bind(this, "minus")}>
            ◀ </div>
          <div id="loadIcon"><img src="images/loading.gif" /></div>
          <div className="arrow" onClick={this.changePicture.bind(this, "plus")}>
            ▶ </div>
          <img id="business-image" src={this.props.business[`img${this.state.showPic}`]}></img>
        </div>
        <div className="head-title">
          <h3 style={{backgroundColor: `rgba( ${r}, ${g}, ${b}, .7)`}}>
            { stars } {numReviews || 0 } Reviews</h3>
          <h1 style={{backgroundColor: `rgba( ${r}, ${g}, ${b}, .5)`}}>
            {this.props.business.name}</h1>
        </div>
        <div className="summary-reviews">
        <div className="quick-summary">
          <div className="quick-info" style={{backgroundColor: `rgba( ${r}, ${g}, ${b}, .9)`}}>
            <span>Price: {"$".repeat(this.props.business.price) || "No price yet"}</span>
            <span><span aria-hidden="true" data-icon="◈"></span>
              {this.props.business.category || "No categories yet"}</span>
            <span><span aria-hidden="true" data-icon="☎"></span>
              {this.props.business.phone || "No phone # yet"}</span>
            <span id="address"><span aria-hidden="true" data-icon="✖"></span>
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
              <h3 style={{color: `rgba( ${r}, ${g}, ${b}, .9)`}}>Reviews</h3>
              { reviewText }
            </div>
      </div>


      </div>
    );
  }
});

module.exports = Business;
