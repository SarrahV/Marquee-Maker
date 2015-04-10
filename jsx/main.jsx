(function(views) {

  views.Main = React.createClass({

    renderSign: function() {
      return <div>
        <aside>
          <views.TracksInput collection={this.props.collection}/>
        </aside>
        <div className="main">
          <views.SignView collection={this.props.collection}/>
        </div>
      </div>
    },

    render: function() {
      return this.renderSign();
    }
  });
})(signapp.views);