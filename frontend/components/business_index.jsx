const React = require('react');
const IndexItem = require('./index_item');

const BusinessIndex = React.createClass({
  getInitialState() {
    return ({showIndex: 0});
  },
  _handleClick(e) {
    if (e.target.innerHTML === "⍄") {
      if(Math.floor(Object.keys(this.props.businesses).length / 10) + 1
      !== this.state.showIndex + 1) {
        this.setState({showIndex: this.state.showIndex + 1});
      }
    } else if(e.target.innerHTML === "⍃") {
      if(this.state.showIndex - 1 >= 0) {
        this.setState({showIndex: this.state.showIndex - 1});
      }
    } else {
      this.setState({showIndex: parseInt(e.target.innerHTML) - 1});
    }
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
        <br /> <br />
        <ul className="pagination">
          <li className="pagination-arrow" onClick={this._handleClick}>⍃</li>
          {
            pagination.map((i) => {
              return <li style={{backgroundColor: this.state.showIndex === (i - 1) ? "#ddd" : "", padding: "0 8px"}} onClick={this._handleClick}>{i}</li>;
            })
          }
          <li className="pagination-arrow" onClick={this._handleClick}>⍄</li>
        </ul>
      </div>
    );
  }
});

module.exports = BusinessIndex;
