const React = require('react');
const IndexItem = require('./index_item');

const BusinessIndex = React.createClass({
  render() {
    const businesses = this.props.businesses;
    const businessKeys = Object.keys(businesses);
    return (
      <div>
        <h1>Businesses: </h1>
        {
          businessKeys.map( key => {
            return (<IndexItem
              business={businesses[key]}
              key={key} />);
          })
        }
      </div>
    );
  }
});

module.exports = BusinessIndex;
