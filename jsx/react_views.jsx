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
          <li>
            <span>M</span>
            <span>A</span>
            <span>Y</span>
            <span>B</span>
            <span>E</span>
          </li>
        </ul>
      )
    }
  });//end tracksview

  views.TracksView = TracksView;


})(signapp.views = {});





