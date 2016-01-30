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