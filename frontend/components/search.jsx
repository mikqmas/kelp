'use strict';

//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;

//Components
const BusinessIndex = require('./business_index');
const FilterForm = require('./filter_form');
const BusinessMap = require('./business_map');

//Actions
const BusinessActions = require('../actions/business_actions');

//Stores
const BusinessStore = require('../stores/business_store');
const FilterParamsStore = require('../stores/filter_params_store');



const Search = React.createClass({
  getInitialState() {
    return {
      businesses: BusinessStore.all(),
      filterParams: FilterParamsStore.params()
    };
  },

  _businessesChanged() {
    this.setState({businesses: BusinessStore.all()});
  },

  _filtersChanged() {
    const newFilters = FilterParamsStore.params();
    this.setState({filterParams: newFilters});
    BusinessActions.fetchAllBusinesses(newFilters);
  },

  componentDidMount() {
    this.businessListener = BusinessStore.addListener(this._businessesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    const filterParams = FilterParamsStore.params();
    BusinessActions.fetchAllBusinesses(filterParams);
  },

  componentWillUnmount() {
    this.businessListener.remove();
    this.filterListener.remove();
  },

  render() {
    return(
      <div className="user-pane">
        <div className="left-half">
          <p>Left Half</p>
            <BusinessMap businesses={this.state.businesses}/>
        </div>
        <div className="right-half">
          <FilterForm filterParams={this.state.filterParams} />
          <BusinessIndex businesses={this.state.businesses}/>
        </div>
      </div>
    );
  }
});

module.exports = Search;
