//React
const React = require('react');
const hashHistory = require('react-router').hashHistory;

//Components
const BusinessIndex = require('./business_index');
const BusinessMap = require('./business_map');
const Header = require('./header');
const AuthButtons = require('./auth_buttons');

//Actions
const BusinessActions = require('../actions/business_actions');

//Stores
const BusinessStore = require('../stores/business_store');
const FilterParamsStore = require('../stores/filter_params_store');


const Splash = React.createClass({
  getInitialState() {
    return {
      businesses: {},
      filterParams: FilterParamsStore.params()
    };
  },

  _businessesChanged() {
    this.setState({businesses: BusinessStore.all()}, () => {
      if(!!this.props.params.businessId && !Object.keys(this.state.businesses).includes(this.props.params.businessId)) {
        if (Object.keys(this.state.businesses).length === 0) {
          hashHistory.push('/');
        }else {
          hashHistory.push('/businesses/' + this.state.businesses[Object.keys(this.state.businesses)[0]].id);
        }
      }
    });
  },

  _filtersChanged() {
    const newFilters = FilterParamsStore.params();
    this.setState({filterParams: newFilters});
    BusinessActions.fetchAllBusinesses(newFilters);
  },

  componentDidMount() {
    this.businessListener = BusinessStore.addListener(this._businessesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    const filterParams = FilterParamsStore.params();
    this.playYoutube();
    var myVideo = document.getElementById("splash-video");
    myVideo.addEventListener("ended", this.hideVid);
    myVideo.play();
  },

  playYoutube() {
    var video = document.querySelectorAll("video")[0];
        var src = video.src || (function () {
            var sources = video.querySelectorAll("source");
            for (var j = 0, sl = sources.length; j < sl; j++) {
                var source = sources[j];
                var type = source.type;
                var isMp4 = type.indexOf("mp4") !== -1;
                if (isMp4) return source.src;
            }
            return null;
        })();
        if (src) {
            var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
            if (isYoutube) {
                var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
                id = (id.length > 1) ? id.splice(1) : id;
                id = id.toString();
                var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
                video.src = mp4url + id + "&hd=1";
            }
        }
  },

  componentWillUnmount() {
    this.businessListener.remove();
    this.filterListener.remove();
  },
  hideVid() {
    $('video').animate({
      opacity: 0
    }, 500, 'swing', () => {$('video').remove();});
    $('#title-splash').animate({opacity: 0},500, 'swing',
    () => {$('#title-splash').remove();});
  },

  render() {
    return(
      <div className="main-body">
        <div className="main-pane">
          <AuthButtons />
          <Header pathname={this.props.location.pathname}/>
        <div className="video-container">
          <div id="title-splash"><h1>Kelp</h1><h3>Eat with your Eyes</h3></div>
            <video autoplay='true' preload="auto" class="video-playing" id="splash-video">
              <source src="www.youtube.com/watch?v=FOLHgoRcMHU" type="video/mp4" />
            </video>
        </div>
          <div className="map">
            <BusinessMap businesses={this.state.businesses}/>
          </div>
          <div className="info">
            <div className="business-pane">
              <BusinessIndex businesses={this.state.businesses}/>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});



module.exports = Splash;
