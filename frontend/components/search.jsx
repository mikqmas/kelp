"use strict";

const React = require('react');
const BusinessStore = require('../stores/business_store');
const BusinessActions = require('../actions/business_actions');
const BusinessIndex = require('./business_index');
const hashHistory = require('react-router').hashHistory;


const Search = React.createClass({
  getInitialState() {
    return {
      businesses: BusinessStore.all()
    };
  },

  _businessesChanged() {
    this.setState({businesses: BusinessStore.all()});
  },

  _filtersChanged() {
    BusinessActions.fetchAllBusinesses();
  },

  componentDidMount() {
    this.businessListener = BusinessStore.addListener(this._businessesChanged);
    BusinessActions.fetchAllBusinesses();
  },

  componentWillUnmount() {
    this.businessListener.remove();
  },

  render() {
    return(
      <div className="user-pane">
        <div className="left-half">
          <p>Left Half</p>
        </div>
        <div className="right-half">
          <BusinessIndex businesses={this.state.businesses}/>
        </div>
      </div>
    );
  }
});

module.exports = Search;
