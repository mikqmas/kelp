const React = require('react');
const hashHistory = require('react-router').hashHistory;
const IndexItem = require('./index_item');

const BusinessIndex = React.createClass({
  getInitialState() {
    return ({showIndex: 0});
  },
  _handleClick(e) {
    if (e.target.innerHTML === "⍄") {
      if(Math.floor(Object.keys(this.props.businesses).length / 10)
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
    const numBuckets = Math.floor(businessKeys.length / 10);
    const showIdx = (this.state.showIndex > numBuckets - 1) ? 0 : this.state.showIndex ;

    let pagination = [];
    for(let i = 1; i <= numBuckets; i++) {
      pagination.push(i);
    }
    return (
      <div className="businesses-index panel">
        <div className="flex-wrap">
        {
          (businessKeys.length > 0) ?
          businessKeys.slice(showIdx*10, showIdx*10+10).map( key => {
            return (<IndexItem
              business={businesses[key]}
              key={key} />);
          }) : <h4 style={{margin: '0 auto'}}>No Results</h4>
        }
        </div>
        <div>
        <ul className="pagination">
          <li className="pagination-arrow"
              style={{display: numBuckets === 0 ? "none" : "block"}}
              onClick={this._handleClick}>⍃</li>
          {
            pagination.map((i) => {
              return <li key={i} style={{backgroundColor: showIdx === (i - 1) ?
                  "#ddd" : "", padding: "0 8px"}} onClick={this._handleClick}>{i}</li>;
            })
          }
          <li className="pagination-arrow"
              style={{display: numBuckets === 0 ? "none" : "block"}}
              onClick={this._handleClick}>⍄</li>
        </ul>
        </div>
      </div>
    );
  }
});

module.exports = BusinessIndex;
