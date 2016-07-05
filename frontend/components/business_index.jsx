const React = require('react');
const IndexItem = require('./index_item');

const BusinessIndex = React.createClass({
  render() {
    const businesses = this.props.businesses;
    const businessKeys = Object.keys(businesses);
    return (
      <div className="businesses-index panel">
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
