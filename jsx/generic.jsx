(function(views) {

  views.Icon = React.createClass({

    render: function() {
      // create the font awesome class
      var cssClass = "fa fa-" + this.props.fa;
      // add spin effect 
      if (this.props.spin) {
        cssClass += " fa-spin";
      }

      return <i className={cssClass}/>
    }

  });

})(signapp.views);