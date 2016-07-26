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
  center: {lat: 37.778042, lng: -122.4125}, //SF City Hall
  scrollwheel: false,
  navigationControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
  }
};

const infowindows = [];
const MapContainer = React.createClass({
  componentDidMount() {
    const map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions);
    this.markers = [];
    this.initMap();
    this.registerListeners();
    this._onChange();

  },

  initMap() {
     var input = /** @type {!HTMLInputElement} */(
         document.getElementById('location-search'));

     var autocomplete = new google.maps.places.Autocomplete(input);
     autocomplete.bindTo('bounds', this.map);

    //  var infowindow = new google.maps.InfoWindow();
    //  var marker = new google.maps.Marker({
    //       map: this.map,
    //       anchorPoint: new google.maps.Point(0, -29)
    //     });

     autocomplete.addListener('place_changed', function() {
      //  infowindow.close();
       var place = autocomplete.getPlace();
       if (!place.geometry) {
         return;
       }

       if (place.geometry.viewport) {
         this.map.fitBounds(place.geometry.viewport);
       } else {
         this.map.setCenter(place.geometry.location);
       }
       this.map.setZoom(16);

      //  marker.setIcon(/** @type {google.maps.Icon} */({
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(35, 35)
      // }));
      // marker.setPosition(place.geometry.location);
      // marker.setVisible(true);


      //  var address = '';
      //  if (place.address_components) {
      //    address = [
      //      (place.address_components[0] && place.address_components[0].short_name || ''),
      //      (place.address_components[1] && place.address_components[1].short_name || ''),
      //      (place.address_components[2] && place.address_components[2].short_name || '')
      //    ].join(' ');
      //  }

      //  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      //  infowindow.open(this.map);
      this.map.setCenter(place.geometry.location);
     }.bind(this));
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
      const infowindow = new google.maps.InfoWindow({
        content: ('<div><strong>' + business.name + '</strong><br>' +
                  business.address.split(",")[0] + '</div>'
                  + "★".repeat(Math.round(business.average_rating))
              + " " + "$".repeat(business.price))
      });
      hashHistory.push("businesses/" + business.id );
      infowindow.setPosition(marker.getPosition());
      infowindow.open(this.map, marker);
      infowindows.forEach((e)=>{e.close();});
      infowindows.length = 0;
      infowindows.push(infowindow);
    });
    this.markers.push(marker);
  },

  removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  },

  render() {
    return (
      <div>
      <div className="map" ref="map">Map</div>
      </div>
    );
  }
});

module.exports = MapContainer;
