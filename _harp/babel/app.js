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


var TrackBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: "tracks.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render: function() {
    return (
      <div className="trackBox">
        <TrackList data={this.state.data} />
      </div>
    );
  }
});

var TrackList = React.createClass({
  render: function() {
    var nodes = this.props.data.map(function(d,i) {
      return (
        <tr key={d.filename} data-track_idx={i} className="track">
          <td className="right">{i+1}.</td>
          <td>{d.title}</td>
          <td>{convertDuration(d.time)}</td>
        </tr>
      );
    });
    return (
      <table className="trackList">
        <thead>
          <tr>
            <th className="right">#</th>
            <th>Title</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {nodes}
        </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <TrackBox />,
  document.getElementById('trackbox')
);

function convertDuration(sec) {
  var ms = sec * 1000;
	var h = String(Math.floor(ms / 3600000) + 100).substring(1);
	var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
	var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
	var hm = Number(h)*60 + Number(m);
	return hm+':'+s;
}
