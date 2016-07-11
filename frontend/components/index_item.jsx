const React = require('react');
const hashHistory = require('react-router').hashHistory;

const foodImages = require('../constants/food_images');

const IndexItem = React.createClass({
  handleClick() {
    const businessID = this.props.business.id;
    hashHistory.push("/businesses/" + businessID );
  },
  render() {
    const business = this.props.business;
    const numReviews = business.review_count;
    const reviewAvg = business.average_rating;
    let stars;
    if(numReviews === 0) {
      stars = "";
    }else {
      stars = "★".repeat(Math.floor(reviewAvg));
      if((reviewAvg % 1 * 10) > 4){
        stars += "½";
      }
    }

    return (
        <div className="business-index-item" onClick={this.handleClick}
          style={{backgroundImage: `url(${business.picture_url})`}}>

         <div className="basic-business-info" >
           <span className="business-name">
              <a href="javascript:void(0)" onClick={this.handleClick}>
                {business.name}</a>
            </span>
            <span className="index-item-copy">
              {stars}
              &nbsp;&nbsp;
              {numReviews || 0 } Reviews
            </span>
            <span className="index-item-copy">
              {"$".repeat(business.price)}
            </span>
          </div>
          <div className="index-blackout"></div>
        </div>
    );
  }
});

module.exports = IndexItem;
