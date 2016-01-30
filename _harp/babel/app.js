console.log('babel/app.js');

var json_data = {
  albums: [
    {
      id: "another-fields",
      title: "Another Fields"
    },
    {
      id: "blue-fantasy",
      title: "Blue Fantasy"
    },
    {
      id: "green-of-mana",
      title: "Green of Mana"
    },
    {
      id: "midnight-celebration",
      title: "Midnight Celebration"
    },
    {
      id: "silver-forest",
      title: "Silver Forest"
    },
    {
      id: "sealed-story",
      title: "Sealed Story"
    },
    {
      id: "wild-neverland",
      title: "Wild Neverland"
    }
  ]
};

var AlbumBox = React.createClass({
  loadCommentsFromServer: function() {
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
    this.setState({data: json_data});
  },
  getInitialState: function() {
    return {data: {albums: []}};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render: function() {
    return (
      <div className="albumBox">
        <AlbumList data={this.state.data} />
      </div>
    );
  }
});

var AlbumList = React.createClass({
  render: function() {
    var nodes = this.props.data.albums.map(function(d) {
      return (
        <a key={d.id} href={"../"+d.id+"/"}>
          <img src={"../"+d.id+"/jacket.png"} />
          <span>{d.title}</span>
        </a>
      );
    });
    return (
      <div className="albumList">
        {nodes}
      </div>
    );
  }
});

ReactDOM.render(
  <AlbumBox />,
  document.getElementById('albumbox')
);
