(function(views){

  //outer sign and pole
  var SignView = React.createBackboneClass({

    render: function(){
      return (
        <div className="wrap"> 
          <div className="can metal linear">
            <div className="face">
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
  var Tracksview = React.createBackboneClass({

    render: function(){
      return (
        <ul className="tracks">
        </ul>
      )
    }
  });//end tracksview

  views.TracksView = TracksView;


})(signapp.views = {});





