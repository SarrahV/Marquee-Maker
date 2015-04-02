(function(views){

  // textfield 
  var TextField = React.createBackboneClass({

    getDefaultProps: function() {
      return {
        maxChars: 5
      };
    },

    getInitialState: function() {
      return {
        sentence: ""
      };
    },

    onChange: function (event) {
      var sentence = event.target.value;
      sentence = sentence.substr(0, this.props.maxChars);
      this.setState({sentence: sentence});
      this.props.model.set("sentence", sentence);

    }, 

    render: function(){
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.type || "text";
      return (
        <div className="textfield">
          <div>
            <label htmlFor={htmlID}>{label}</label>
          </div>
          <div>
            <input
            value={this.state.sentence} 
            type={type} name={name} 
            id={htmlID} 
            placeholder="Enter Text" 
            onChange={this.onChange}/>
          </div>
        </div>
      );
    }

  });// end textfield


  // tracks form
  var TracksInput = React.createBackboneClass({

    //each textfield represents one model
    showTracks: function(model, index){
      return (
        <TextField model={model} key={index} maxChars="11" />
      )
    },

    render: function(){
      return (
        <form>
          <div className="size">
            <BoardSize/>
            <LetterSize/>
          </div>
          {this.props.collection.map(this.showTracks)}
          <div className="add-remove">
            <AddTrack collection={this.props.collection}/>
            <RemoveTrack collection={this.props.collection}/>
          </div>
          <SelectStyle/>
          <CharacterCount collection={this.props.collection}/>
        </form>
      );
    }
  });// end trackinput

  //add a track 
  var AddTrack = React.createBackboneClass({

    onAdd: function(e){
      e.preventDefault();
      this.props.collection.add({});
    },

    render: function(){
      return (
          <span className="add">
            <a href="#" onClick={this.onAdd}>+</a>
          </span>
      );
    }

  });//end add track


  //remove a track
  var RemoveTrack = React.createBackboneClass({

    onRemove: function(e){
       e.preventDefault();
       this.props.collection.pop();
    },
    
    render: function(){
      return (
          <span className="delete">
            <a href="#" onClick={this.onRemove}>-</a>
          </span>
      );
    }

  });//remove track


  //style selection
  var SelectStyle = React.createBackboneClass({

    render: function(){
      return (
        <div className="style">
          <div className="standard">
            <a href="#"><span>C</span></a>
            <h3>Standard</h3>
          </div>
          <div className="condensed">
            <a href="#"><span>C</span></a>
            <h3>Condensed</h3>
          </div>
          <div className="modern">
            <a href="#"><span>C</span></a>
            <h3>Modern</h3>
          </div>
        </div>
      );
    }

  });

  //Board width and height selection
  var BoardSize = React.createBackboneClass({

    render: function(){
      return (
        <div className="board-width">
          <h3>Board Width</h3>
          <select>
            <option value="sixty">60 in</option>
            <option value="seventy-two">72 in</option>
            <option value="eighty-eight">88 in</option>
            <option value="ninety-six">96 in</option>
            <option value="one-twenty">120 in</option>
          </select>
        </div>
      )
    }
  });

  //Letter height selection
  var LetterSize = React.createBackboneClass({

    render: function(){
      return (
        <div className="letter-height">
          <h3>Letter Height</h3>
          <select>
            <option value="six">5 in</option>
            <option value="seven">7 in</option>
            <option value="ten">10 in</option>
          </select>
        </div>
      )
    }
  });

  //Count of characters used
  var CharacterCount = React.createBackboneClass({

    componentWillMount: function() {
      this.props.collection.on("change", function(){

        this.setState({
          charCounts: this.getCharCount()
        });

      }, this);
    },

    getInitialState: function() {
      return {
        charCounts: {}
      }
    },

    getCharCount: function() {
      var sentences = this.props.collection.pluck("sentence"); 
      var letters = sentences.join("");

      letters = letters.replace(/ /g, "");
      letters = letters.split("");

      var grouped = _.groupBy(letters);
      var answer = {};

      _.each(grouped, function(value, key) {
        answer[key] = value.length;
      });

      return answer;
      console.log(answer);
    },

    getChar: function(count, letter) {
      return (
        <div key={letter}>
          <strong>{count}</strong><em> of </em><strong>{letter}</strong>
        </div>
      );
    },

    render: function() {
      return (
        <div className="chars-count">
          <h3>Character Count</h3>
          <div>{_.map(this.state.charCounts, this.getChar)}</div>
        </div>
      )
    }

  });
  
  views.CharacterCount = CharacterCount;
  views.SelectStyle    = SelectStyle;
  views.BoardSize      = BoardSize;
  views.LetterSize     = LetterSize;
  views.TextField      = TextField;
  views.TracksInput    = TracksInput;

})(signapp.views);


