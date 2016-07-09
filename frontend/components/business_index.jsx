const React = require('react');
const IndexItem = require('./index_item');

const BusinessIndex = React.createClass({
  getInitialState() {
    return ({showIndex: 0});
  },
  _handleClick(e) {
    this.setState({showIndex: parseInt(e.target.innerHTML) - 1});
  },

  render() {
    const businesses = this.props.businesses;
    const businessKeys = Object.keys(businesses);
    const numBuckets = Math.floor(businessKeys.length / 10) + 1;
    let pagination = [];
    for(let i = 1; i <= numBuckets; i++) {
      pagination.push(i);
    }
    return (
      <div className="businesses-index panel">
        {
          businessKeys.slice(this.state.showIndex*10, this.state.showIndex*10+10).map( key => {
            return (<IndexItem
              business={businesses[key]}
              key={key} />);
          })
        }
        <ul className="pagination">
        {
          pagination.map((i) => {
            return <li onClick={this._handleClick}>{i}</li>;
          })
        }
        </ul>
      </div>
    );
  }
});

module.exports = BusinessIndex;
