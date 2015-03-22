(function(views){

  //outer sign and pole
  var SignView = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("div", {className: "wrap"}, 
          React.createElement("div", {className: "can metal linear"}, 
            React.createElement("div", {className: "face"}
            )
          ), 
          React.createElement("div", {className: "pole metalPole linearPole"}
          )
        )
      )
    }
  });//end signview

  views.SignView = SignView;

  //all tracks
  var Tracksview = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("ul", {className: "tracks"}
        )
      )
    }
  });//end tracksview

  views.TracksView = TracksView;


})(signapp.views = {});





