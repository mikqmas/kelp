const React = require('react');
const BusinessStore = require('../stores/business_store');
const Link = require('react-router').Link;
// const BusinessDetail = require('./business_detail');
// const BusinessMap = require('./business_map');
const BusinessActions = require('../actions/business_actions');
const hashHistory = require('react-router').hashHistory;

const BusinessShow = React.createClass({
  getInitialState() {
    const businessId = this.props.params.businessId;
    const business = BusinessStore.find(businessId) || {} ;
    return { business };
  },

  componentDidMount() {
    this.businessListener = BusinessStore.addListener(this._businessChanged);
    BusinessActions.fetchAllBusinesses();
  },

  componentWillUnmount() {
    this.businessListener.remove();
  },

  _businessChanged() {
    const businessId = this.props.params.businessId;
    const business = BusinessStore.find(businessId);
    this.setState({ business });
  },

  showReviewForm() {
    hashHistory.push(`/businesses/${this.state.business.id}/review`);
  },

  render() {
    const reviewURL = "/businesses/" + this.state.business.id + "/review";
    const businesses = {};
    businesses[this.state.business.id] = this.state.business;

    return (
        <div className="single-business-show">
          <Link to="/" >Back to Businesses Index</Link>
          <p>{this.state.business.name}</p>
          <p>{this.state.business.price}</p>
          <p>{this.state.business.address}</p>
          <p>{this.state.business.rating}</p>
          <p>{this.state.business.health_score}</p>
        </div>
      );
  }
});

module.exports = BusinessShow;
