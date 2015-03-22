(function(views){

  //outer sign and pole
  var SignView = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("div", {className: "wrap"}, 
          React.createElement("div", {className: "can metal linear"}, 
            React.createElement("div", {className: "face"}, 
              React.createElement(TracksView, null)
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
  var TracksView = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("ul", {className: "tracks"}, 
          React.createElement("li", null, 
            React.createElement("span", null, "M"), 
            React.createElement("span", null, "A"), 
            React.createElement("span", null, "Y"), 
            React.createElement("span", null, "B"), 
            React.createElement("span", null, "E")
          )
        )
      )
    }
  });//end tracksview

  views.TracksView = TracksView;


})(signapp.views = {});





