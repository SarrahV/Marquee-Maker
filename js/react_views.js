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
          React.createElement(TrackView, null)
        )
      )
    }
  });//end tracksview

  views.TracksView = TracksView;

  // ind track
  var TrackView = React.createBackboneClass({
    render: function(){
      return (
      React.createElement("li", null, React.createElement(LetterView, null))
      )
    }
  });//end trackview

  views.TrackView = TrackView;


  //ind letter
  var LetterView = React.createBackboneClass({
    render: function(){
      return (
        React.createElement("span", null, "A")
      )
    }
  });// end letterview

  views.LetterView = LetterView

})(signapp.views = {});





