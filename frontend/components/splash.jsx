//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;

//Components
const BusinessIndex = require('./business_index');
const FilterForm = require('./filter_form');
const BusinessMap = require('./business_map');
const Header = require('./header');

//Actions
const BusinessActions = require('../actions/business_actions');

//Stores
const BusinessStore = require('../stores/business_store');
const FilterParamsStore = require('../stores/filter_params_store');


const Splash = React.createClass({
  getInitialState() {
    return {
      businesses: {},
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
    // BusinessActions.fetchAllBusinesses(filterParams);
  },

  componentWillUnmount() {
    this.businessListener.remove();
    this.filterListener.remove();
  },

  render() {
    return(
      <div className="main-body">
        <Header pathname={this.props.location.pathname}/>
        <div className="main-pane">
          <div className="map">
            <BusinessMap businesses={this.state.businesses}/>
          </div>
          <div className="info">
            <FilterForm filterParams={this.state.filterParams} />
            <div className="business-pane">
              <BusinessIndex businesses={this.state.businesses}/>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Splash;
