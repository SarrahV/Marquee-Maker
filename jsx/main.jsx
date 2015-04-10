(function(views) {

  views.Main = React.createBackboneClass({
    getDefaultProps: function() {
      return {
        showBoards: false
      }
    },

    renderBoards: function() {
      return (
        <div>
          <aside />
          <div className="main">
            <views.BoardList onSelect={this.props.onBoardSelect} model={this.props.boards} />
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
      if (this.props.showBoards) {
        return this.renderBoards();
      } else {
        return this.renderSign();
      }
    }
  });
})(signapp.views);