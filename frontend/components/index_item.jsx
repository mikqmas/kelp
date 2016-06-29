const React = require('react');
const hashHistory = require('react-router').hashHistory;

const IndexItem = React.createClass({
  handleClick() {
    const businessID = this.props.business.id;
    hashHistory.push("businesses/" + businessID );
  },

  render() {
    const business = this.props.business;
    return (
        <div className="business-index-item"
             onClick={this.handleClick}>
          <div className="index-item-info">
            <span className="index-item-category">Rating: </span>
            <span className="index-item-copy">
              {business.rating || "No reviews yet"}
            </span>
            <span className="index-item-category">Address </span>
            <span className="index-item-copy">
              {business.address}
            </span>
            <span className="index-item-category">Name: </span>
            <span className="index-item-copy">
              {business.name}
            </span>
          </div>
        </div>
    );
  }
});

module.exports = IndexItem;
