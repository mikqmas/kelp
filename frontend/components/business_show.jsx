const React = require('react');
const BusinessStore = require('../stores/business_store');
const Link = require('react-router').Link;
const BusinessDetail = require('./business_detail');
const BusinessActions = require('../actions/business_actions');
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../stores/session_store');

const BusinessShow = React.createClass({
  getInitialState() {
    const businessId = this.props.params.businessId;
    const business = BusinessStore.find(businessId) || {} ;
    return { business };
  },

  componentDidMount() {
    this.businessListener = BusinessStore.addListener(this._businessChanged);
    // BusinessActions.fetchAllBusinesses();
  },

  componentWillReceiveProps(nextProps) {
    const business = BusinessStore.find(nextProps.params.businessId);
    this.setState({ business });
  },

  componentWillUnmount() {
    this.businessListener.remove();
  },

  _businessChanged() {
    const businessId = this.props.params.businessId;
    const business = BusinessStore.find(businessId);
    this.setState({ business });
  },



  render() {
    const reviewURL = "/businesses/" + this.state.business.id + "/review";
    const businesses = {};
    businesses[this.state.business.id] = this.state.business;

    return (
        <div className="single-business-show panel">
          <BusinessDetail business={this.state.business}/>
          {
            this.props.children
          }
        </div>
      );
  }
});

module.exports = BusinessShow;
