const React = require('react');
const BusinessActions = require('../actions/business_actions');
const hashHistory = require('react-router').hashHistory;

const BusinessForm = React.createClass({
  getInitialState() {
    return {
      name: "",
      rating: 0,
      price: 0,
      health_score: 100,
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
    const business = Object.assign({}, this.state, this._coords());
    BusinessActions.createBusiness(business);
    this.navigateToSearch();
  },
  navigateToSearch() {
    hashHistory.push("/");
  },
  handleCancel(event) {
    event.preventDefault();
    this.navigateToSearch();
  },
  _coords() {
    return this.props.location.query;
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value});
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
                onChange={this.update("address")} className="business-field"/>

              <label className="business-field">city</label>
              <input type="text" value={this.state.city}
                onChange={this.update("city")} className="business-field"/>

              <label className="business-field">postal_code</label>
              <input type="text" value={this.state.postal_code}
                onChange={this.update("postal_code")} className="business-field"/>

              <label className="business-field">state_code</label>
              <input type="text" value={this.state.state_code}
                onChange={this.update("state_code")} className="business-field"/>

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
        </div>
    );
  }
});

module.exports = BusinessForm;
