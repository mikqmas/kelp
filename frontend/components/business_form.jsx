const React = require('react');
const BusinessActions = require('../actions/business_actions');
const hashHistory = require('react-router').hashHistory;

const BusinessForm = React.createClass({
  getInitialState() {
    return {
      name: "",
      address: "",
      rating: 0,
      price: 0,
      health_score: 0
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

              <label className="business-field">Address</label>
              <input type="text" value={this.state.address}
                onChange={this.update("address")} className="business-field"/>

              <label className="business-field">Rating</label>
              <input min='0' type="number" value={this.state.rating}
                onChange={this.update("rating")} className="business-field"/>

              <label className="business-field">Price</label>
              <input min='0' type="number" value={this.state.price}
                onChange={this.update("price")} className="business-field"/>

              <label className="business-field">Health Score</label>
              <input min='0' type="number" value={this.state.health_score}
                onChange={this.update("health_score")} className="business-field"/>

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
