//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;

//Actions
const BusinessActions = require('../actions/business_actions');

//Geocoder for Gmaps
const geocoder = new google.maps.Geocoder();
let suggestedAddresses = [];

const BusinessForm = React.createClass({
  getInitialState() {
    return {
      name: "",
      rating: "",
      price: "",
      health_score: "",
      description: "",
      phone: "",
      address: "",
      city: "",
      postal_code: "",
      state_code: "",
      picture_url: "",
      category: "",
    };
  },
  handleSubmit(event) {
    event.preventDefault();
    this.codeAddress();
    this.navigateToSearch();
  },
  navigateToSearch() {
    hashHistory.push("/");
  },
  handleCancel(event) {
    event.preventDefault();
    this.navigateToSearch();
  },
  suggestAddresses() {
    const address = this.state.address;
    geocoder.geocode( { 'address' : address, 'region' : 'us',
      componentRestrictions: {country: 'US'}},
    function( results, status ) {
      if( status === google.maps.GeocoderStatus.OK ) {
        suggestedAddresses = results;
      } else {
        // alert( 'Geocode error: ' + status );
      }
    });
  },

  codeAddress() {
    let latLng = "";
    const address = this.state.address;
    geocoder.geocode( { 'address' : address },
    function( results, status ) {
      if( status === google.maps.GeocoderStatus.OK ) {
        latLng = {lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()};
      } else {
        alert( 'Geocode error: ' + status );
      }
      const business = Object.assign({}, this.state, latLng);
      BusinessActions.createBusiness(business);
    }.bind(this));
  },
  _coords() {
    return this.props.location.query;
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value}, this.suggestAddress);
  },
  updateAddress(e) {
    this.setState({address : e.target.value}, this.suggestAddresses);
  },
  _handleAddressClick(e){
    debugger;
    this.setState({address: e.target.result.formatted_address});
  },
  render() {
    const lat = this._coords().lat, lng = this._coords().lng;
    return (
        <div className="new-business-container">
          <div className="new-business-form">
            <h3 className="new-business-title">Create A Business!</h3>
            <form onSubmit={this.handleSubmit}>
              <label className="business-field">Name</label>
              <input type="text" value={this.state.name}
                onChange={this.update("name")} className="business-field"/>

              <label className="business-field">Price</label>
              <input min='1'  max='5' type="number" value={this.state.price}
                onChange={this.update("price")} className="business-field"/>

              <label className="business-field">description</label>
              <input type="text" value={this.state.description}
                onChange={this.update("description")} className="business-field"/>

              <label className="business-field">phone</label>
              <input type="tel" value={this.state.phone}
                onChange={this.update("phone")} className="business-field"/>

              <label className="business-field">Address</label>
              <input type="text" value={this.state.address}
                onChange={this.updateAddress} className="business-field"/>



              <label className="business-field">picture_url</label>
              <input type="text" value={this.state.picture_url}
                onChange={this.update("picture_url")} className="business-field"/>

              <label className="business-field">category</label>
              <input type="text" value={this.state.category}
                onChange={this.update("category")} className="business-field"/>

              <div className="button-holder">
                <input type="submit" value="Create Business" className="new-business-button"/>
              </div>
            </form>
            <div className="button-holder">
              <button className="new-business-button" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
          <div id="addressSuggesions">
            {
              suggestedAddresses.map((result)=>{
                return <li onClick={this._handleAddressClick}
                  result={result}>{result.formatted_address}</li>
              })
            }
          </div>
        </div>
    );
  }
});

module.exports = BusinessForm;
