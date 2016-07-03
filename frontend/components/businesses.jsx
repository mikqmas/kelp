'use strict';

//React
const React = require('react');

//Components
const BusinessIndex = require('./business_index');
const BusinessMap = require('./business_map');
const FilterForm = require('./filter_form');

//Actions
const BusinessActions = require('../actions/business_actions');

//Stores
const BusinessStore = require('../stores/business_store');
const FilterParamsStore = require('../stores/filter_params_store');



const Businesses = React.createClass({
  getInitialState() {
    return {
      businesses: {}
    };
  },

  _businessesChanged() {
    this.setState({businesses: BusinessStore.all()});
  },

  _filtersChanged() {
    const newFilters = FilterParamsStore.params();
    BusinessActions.fetchAllBusinesses(newFilters);
  },

  componentDidMount() {
    this.businessListener = BusinessStore.addListener(this._businessesChanged);
  },

  componentWillUnmount() {
    this.businessListener.remove();
  },

  render() {
    return(
      <div className="right-half">
        <BusinessMap businesses={this.state.businesses} />
        <BusinessIndex businesses={this.state.businesses}/>
      </div>
    );
  }
});

module.exports = Businesses;
