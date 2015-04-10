(function(views) {

  views.Main = React.createClass({

    renderBoards: function() {
      return (
        <div>
          <aside />
          <div className="main">
            <views.BoardList collection={this.props.collection} />
          </div>
        </div>
      )
    },

    renderSign: function() {
      return (
        <div>
          <aside>
            <views.TracksInput collection={this.props.collection}/>
          </aside>
          <div className="main">
            <views.SignView collection={this.props.collection}/>
          </div>
        </div>
      )
    },

    render: function() {
      // Use state to render either the renderSign or renderBoards

      return this.renderSign();
    }
  });
})(signapp.views);