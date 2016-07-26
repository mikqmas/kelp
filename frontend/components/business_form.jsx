//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Autosuggest = require('react-autosuggest');

//Const
const IMGS = require('../constants/food_images');

//Actions
const BusinessActions = require('../actions/business_actions');

//Geocoder for Gmaps
const geocoder = new google.maps.Geocoder();
let suggestedAddresses = [];
let latLng = "";

const BusinessForm = React.createClass({
  getInitialState() {
    return {
      name: "",
      rating: "",
      picture_url: "http://lorempixel.com/50/50/food/",
      category: "",
      price: "",
      health_score: "",
      description: "",
      phone: "",
      address: "",
      city: "",
      state_code: "",
      postal_code: "",
      img1: `https://i.imgur.com/${IMGS[Math.floor(Math.random() * IMGS.length)]}.jpg`,
      img2: `https://i.imgur.com/${IMGS[Math.floor(Math.random() * IMGS.length)]}.jpg`,
      img3: `https://i.imgur.com/${IMGS[Math.floor(Math.random() * IMGS.length)]}.jpg`,
      img4: `https://i.imgur.com/${IMGS[Math.floor(Math.random() * IMGS.length)]}.jpg`,
      img5: `https://i.imgur.com/${IMGS[Math.floor(Math.random() * IMGS.length)]}.jpg`,
    };
  },

  handleSubmit(event) {
    event.preventDefault();
    if(latLng === "") {
      this.codeAddress();
    } else {
      const business = Object.assign({}, this.state, latLng);
      BusinessActions.createBusiness(business);
    }
    const success = $('#success-notice')[0];
    success.style.transition = 'all 0.5s';
    success.style.opacity = 1;
    setTimeout(()=>{
      this.navigateToSearch();
    },1000);
  },

  navigateToSearch() {
    hashHistory.push("/");
  },

  handleCancel(event) {
    event.preventDefault();
    this.navigateToSearch();
  },

  suggestAddresses() {
    const address = `${this.state.address}, california, usa `;
    geocoder.geocode( { 'address' : address,
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

  _setPrice(e) {
    this.setState({price: parseInt(e.target.value)});
  },

  updateAddress(e) {
    this.setState({address : e.target.value}, this.suggestAddresses);
  },
  hideSuggestions(e) {
    setTimeout(()=>{
      $(".suggested-addresses-container").hide();
    },0);
  },
  showSuggestions(e) {
    $(".suggested-addresses-container").show();
  },
  countWords(e) {
    this.setState({word_count: (30 - e.target.value.length)});
  },
  _handleAddressClick(e){
    const city = suggestedAddresses[e.target.value].address_components[3].long_name;
    const state_code = suggestedAddresses[e.target.value].address_components[5].long_name;
    const postal_code = suggestedAddresses[e.target.value].address_components[7] ? suggestedAddresses[e.target.value].address_components[7].long_name : "";
    this.setState({address: e.target.innerHTML, postal_code: postal_code,
                    state_code: state_code, city: city});
    suggestedAddresses = [];
    this.hideSuggestions();
  },
  render() {
    const lat = this._coords().lat, lng = this._coords().lng;
    return (
        <div className="new-business-container">
          <h3 id='success-notice'>Success!</h3>
          <div className="new-business-form">
            <h3 className="new-business-title">Add A Business!</h3>
            <form onSubmit={this.handleSubmit}>
              <label className="business-field">Business Name*</label>
              <input type="text" value={this.state.name} placeholder="Sam's Diner"
                onChange={this.update("name")} className="business-field" required/>

              <label className="business-field" >Price</label>
                <div className="price-group">
                  <span className="price-rating" id="price4" value="4" onClick={this._setPrice}
                    style={{color: this.state.price >= 4 ? 'yellow' : 'gray'}}>$</span>
                  <span className="price-rating" id="price3" value="3" onClick={this._setPrice}
                    style={{color: this.state.price >= 3 ? 'yellow' : 'gray'}}>$</span>
                  <span className="price-rating" id="price2" value="2" onClick={this._setPrice}
                    style={{color: this.state.price >= 2 ? 'yellow' : 'gray'}}>$</span>
                  <span className="price-rating" id="price1" value="1" onClick={this._setPrice}
                    style={{color: this.state.price >= 1 ? 'yellow' : 'gray'}}>$</span>
                </div>

                <label className="business-field">Category</label>
                <input type="text" value={this.state.category} placeholder="Pizza, Diner..."
                  onChange={this.update("category")} className="business-field"/>

                <label className="business-field">Phone</label>
              <input type="tel" value={this.state.phone} placeholder="(555) 555-5555"
                onChange={this.update("phone")} className="business-field"/>

              <div className="new-business-address"
              onBlur={this.hideSuggestions}>
              <label className="business-field">Address*</label>
              <input type="text" value={this.state.address}
                placeholder="160 Spear St., San Francisco, CA 94123" required
                onChange={this.updateAddress}
                onFocus={this.showSuggestions}
                className="business-field"/>

                <div className="suggested-addresses-container">
                  {
                    suggestedAddresses.map((result, idx)=>{
                      return <li key={result.place_id} className="suggested-addresses"
                        onMouseDown={this._handleAddressClick}
                        value={idx}>{result.formatted_address}</li>;
                    })
                  }
                </div>
                </div>

              <label className="business-field" id="business-description">Description {this.state.word_count}</label>
              <input type="text" value={this.state.description}
                placeholder="A good place to grab grub" maxLength="30"
                onInput={this.countWords} onChange={this.update("description")}
                className="business-field"/>

              <div className="button-holder">
                <input type="submit" value="Create Business" className="new-business-button"/>
                <button className="new-business-button" onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    );
  }
});

module.exports = BusinessForm;
