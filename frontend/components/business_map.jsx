const React = require('react');
const ReactDOM = require('react-dom');
const FilterActions = require('../actions/filter_actions');
const hashHistory = require('react-router').hashHistory;

const _getCoordsObj = function(latLng) {
  return ({
    lat: latLng.lat(),
    lng: latLng.lng()
  });
};

const mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

const MapContainer = React.createClass({
  componentDidMount() {
    const map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions);
    this.markers = [];
    this.registerListeners();
    this._onChange();
  },

  markersToRemove(){
    return this.markers.filter( marker => {
      return !this.props.businesses.hasOwnProperty(marker.businessId);
    });
  },

  businessesToAdd(){
    const currentBusinessIds = this.markers.map( marker => marker.businessId );
    const newBusinesses = this.props.businesses;
    const newBusinessIds = Object.keys(newBusinesses);

    return newBusinessIds.reduce( (collection, businessId) => {
      if (!currentBusinessIds.includes(businessId)) {
        return ( collection.concat( [newBusinesses[businessId]] ));
      }
    }, [] );
  },

  componentDidUpdate() {
    this._onChange();
  },

  _onChange() {
    this.businessesToAdd().forEach(this.createMarkerFromBusiness);
    this.markersToRemove().forEach(this.removeMarker);
  },

  registerListeners() {
    const that = this;
    google.maps.event.addListener(this.map, 'idle', () => {
      const mapBounds = that.map.getBounds();
      const northEast = _getCoordsObj(mapBounds.getNorthEast());
      const southWest = _getCoordsObj(mapBounds.getSouthWest());
      //actually issue the request
      const bounds = { northEast, southWest };
      FilterActions.updateBounds(bounds);
    });
  },

  createMarkerFromBusiness(business) {
    const pos = new google.maps.LatLng(business.lat, business.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      businessId: business.id
    });
    marker.addListener('click', () => {
      hashHistory.push("businesses/" + business.id );
    });
    this.markers.push(marker);
  },

  removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  },

  render() {
    return ( <div className="map" ref="map">Map</div>);
  }
});

module.exports = MapContainer;
