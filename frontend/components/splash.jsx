//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;

//Components
const BusinessIndex = require('./business_index');
const BusinessMap = require('./business_map');
const Header = require('./header');
const AuthButtons = require('./auth_buttons');

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
    this.setState({businesses: BusinessStore.all()}, () => {
      if(!!this.props.params.businessId && !Object.keys(this.state.businesses).includes(this.props.params.businessId)) {
        if (Object.keys(this.state.businesses).length === 0) {
          hashHistory.push('/');
        }else {
          hashHistory.push('/businesses/' + this.state.businesses[Object.keys(this.state.businesses)[0]].id);
        }
      }
    });
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
    document.getElementById("splash-video").play();
    // BusinessActions.fetchAllBusinesses(filterParams);
  },

  componentWillUnmount() {
    this.businessListener.remove();
    this.filterListener.remove();
  },

  render() {
    return(
      <div className="main-body">
        <div className="main-pane">
          <AuthButtons />
          <Header pathname={this.props.location.pathname}/>
        <div className="video-container">
          <div id="title-splash"><h1>YepinstA</h1><h3>Eat with your Eyes</h3></div>

            <video preload="auto" autoplay="true" loop="loop" class="video-playing" id="splash-video">
              <source src="https://a0.muscache.com/airbnb/static/P1-background-vid-compressed-2.mp4" type="video/mp4" />
              <source src="https://a0.muscache.com/airbnb/static/P1-background-vid-compressed-2.webm" type="video/webm" />
            </video>

        </div>
          <div className="map">
            <BusinessMap businesses={this.state.businesses}/>
          </div>
          <div className="info">
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
