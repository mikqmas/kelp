const React = require('react');
const BusinessIndex = require('./business_index');
const BuinsessStore = require('../stores/business_store');


module.exports = React.createClass({
  render(){
    return(
      <BusinessIndex businesses={BuinsessStore.all()}/>
    );
  }
});
