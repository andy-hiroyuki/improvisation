"use strict";

console.log('babel/app.js');

var json_data = {
  albums: [{
    id: "another-fields",
    title: "Another Fields"
  }, {
    id: "blue-fantasy",
    title: "Blue Fantasy"
  }, {
    id: "green-of-mana",
    title: "Green of Mana"
  }, {
    id: "midnight-celebration",
    title: "Midnight Celebration"
  }, {
    id: "silver-forest",
    title: "Silver Forest"
  }, {
    id: "sealed-story",
    title: "Sealed Story"
  }, {
    id: "wild-neverland",
    title: "Wild Neverland"
  }]
};

var AlbumBox = React.createClass({
  displayName: "AlbumBox",

  loadCommentsFromServer: function loadCommentsFromServer() {
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
    this.setState({ data: json_data });
  },
  getInitialState: function getInitialState() {
    return { data: { albums: [] } };
  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "albumBox" },
      React.createElement(AlbumList, { data: this.state.data })
    );
  }
});

var AlbumList = React.createClass({
  displayName: "AlbumList",

  render: function render() {
    var nodes = this.props.data.albums.map(function (d) {
      return React.createElement(
        "a",
        { key: d.id, href: "../" + d.id + "/" },
        React.createElement("img", { src: "../" + d.id + "/jacket.png" }),
        React.createElement(
          "span",
          null,
          d.title
        )
      );
    });
    return React.createElement(
      "div",
      { className: "albumList" },
      nodes
    );
  }
});

ReactDOM.render(React.createElement(AlbumBox, null), document.getElementById('albumbox'));

var TrackBox = React.createClass({
  displayName: "TrackBox",

  loadCommentsFromServer: function loadCommentsFromServer() {
    $.ajax({
      url: "tracks.json",
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "trackBox" },
      React.createElement(TrackList, { data: this.state.data })
    );
  }
});

var TrackList = React.createClass({
  displayName: "TrackList",

  render: function render() {
    var nodes = this.props.data.map(function (d, i) {
      return React.createElement(
        "tr",
        { key: d.filename, "data-track_idx": i, className: "track" },
        React.createElement(
          "td",
          { className: "right" },
          i + 1,
          "."
        ),
        React.createElement(
          "td",
          null,
          d.title
        ),
        React.createElement(
          "td",
          null,
          convertDuration(d.time)
        )
      );
    });
    return React.createElement(
      "table",
      { className: "trackList" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { className: "right" },
            "#"
          ),
          React.createElement(
            "th",
            null,
            "Title"
          ),
          React.createElement(
            "th",
            null,
            "Time"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        nodes
      )
    );
  }
});

ReactDOM.render(React.createElement(TrackBox, null), document.getElementById('trackbox'));

function convertDuration(sec) {
  var ms = sec * 1000;
  var h = String(Math.floor(ms / 3600000) + 100).substring(1);
  var m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1);
  var s = String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1);
  var hm = Number(h) * 60 + Number(m);
  return hm + ':' + s;
}