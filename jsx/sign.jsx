(function(views){

  //----------------------------------------- outer sign and pole

  var SignView = React.createBackboneClass({

    render: function(){
      return (
        <div className="wrap"> 
          <div className="can metal linear">
            <div className="face">
              <TracksView collection={this.props.collection}/>
            </div>
          </div>
          <div className="pole metalPole linearPole">
          </div>
        </div>
      )
    }
  });//end signview

  views.SignView = SignView;

  //----------------------------------------- all tracks

  var TracksView = React.createBackboneClass({

    getTrack: function(model, index){
      //grabs each model from the TrackView
      return <TrackView model={model} key={index}/>
    },
    //maps and renders each track to the tracksview
    render: function(){
      return (
        <ul className="tracks">
          {this.props.collection.map(this.getTrack)}
        </ul>
      )
    }
  });//end tracksview

  views.TracksView = TracksView;

  //----------------------------------------- ind track

  var TrackView = React.createBackboneClass({
    //take the sentence from the model
    getWord: function(word, index){
      return (
        <WordView word={word} key={index}/>
      )
    },
    //splits on each space to get the word
    render: function(){
      return (
      <li>
        {this.props.model.get("sentence").split(" ").map(this.getWord)}
      </li>
      )
    }
  });//end trackview

  views.TrackView = TrackView;


  //----------------------------------------- ind word

  var WordView = React.createBackboneClass({
    // gets letter at the index, makes uppercase
    getLetter: function(letter, index){
      return (
        <span key={index}>{letter.toUpperCase()}</span>
      );
    },
    // splits word at the letterspace, maps it, then calls getletter 
    // gets the word from TrackView
    render: function() {
      return (
        <div className="word">
          { this.props.word.split("").map(this.getLetter) }
        </div>
      );
    }
  });// end wordview

})(signapp.views); // end function





