(function(views){

  //outer sign and pole
  var SignView = React.createBackboneClass({

    render: function(){
      return (
        <div className="wrap"> 
          <div className="can metal linear">
            <div className="face">
              <TracksView/>
            </div>
          </div>
          <div className="pole metalPole linearPole">
          </div>
        </div>
      )
    }
  });//end signview

  views.SignView = SignView;

  //all tracks
  var TracksView = React.createBackboneClass({

    render: function(){
      return (
        <ul className="tracks">
          <TrackView/>
        </ul>
      )
    }
  });//end tracksview

  views.TracksView = TracksView;

  // ind track
  var TrackView = React.createBackboneClass({
    render: function(){
      return (
      <li><LetterView/></li>
      )
    }
  });//end trackview

  views.TrackView = TrackView;


  //ind letter
  var LetterView = React.createBackboneClass({
    render: function(){
      return (
        <span>A</span>
      )
    }
  });// end letterview

  views.LetterView = LetterView

})(signapp.views = {});





