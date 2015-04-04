(function(views){

  views.TwitterLoggedIn = React.createClass({displayName: "TwitterLoggedIn",

    render: function(){
      return (
        React.createElement("div", {className: "logged-in", onClick: signapp.logout.bind(signapp)}, 
          React.createElement("img", {className: "profile-image", src: this.props.img, alt: ""}), 
          " ", 
          React.createElement("span", null, this.props.name), 
          " ", 
          React.createElement(views.Icon, {fa: "sign-out"})
        )
      )
    }
  }); //end logged in

   views.TwitterNotLoggedIn = React.createClass({displayName: "TwitterNotLoggedIn",

    render: function() {
      return (
        React.createElement("div", {className: "not-logged-in", onClick: signapp.twitterLogin.bind(signapp)}, 
          React.createElement("span", null, "Sign In With"), 
          " ", 
          React.createElement(views.Icon, {fa: "twitter"})
        )
      );
    }

  });// end not logged in

  views.TwitterLogIn = React.createBackboneClass({
    getChild: function(){
      if(signapp.isLoggedIn()) {
        var name = this.props.model.get("name");
        var img = this.props.model.get("profile_image_url");
        return React.createElement(views.TwitterLoggedIn, {name: name, img: img})
      }
      else{
        return React.createElement(views.TwitterNotLoggedIn, null)
      }
    },

    render: function(){
      return (
        React.createElement("div", {className: "twitter-login"}, 
           this.getChild() 
        )
      );
    }
  });// end Log in

  views.Header = React.createBackboneClass({
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "logo"}, 
            React.createElement("h2", null, "SignApp")
          ), 
          React.createElement(views.TwitterLogIn, {model: this.props.model})
        )
      );
    }
  }); //end header

})(signapp.views);







(function(views) {

  views.Icon = React.createClass({displayName: "Icon",

    render: function() {
      // create the font awesome class
      var cssClass = "fa fa-" + this.props.fa;
      // add spin effect 
      if (this.props.spin) {
        cssClass += " fa-spin";
      }

      return React.createElement("i", {className: cssClass})
    }

  });

})(signapp.views);
(function(views){

  //----------------------------------------- outer sign and pole

  var SignView = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("div", {className: "wrap"}, 
          React.createElement("div", {className: "can metal linear"}, 
            React.createElement("div", {className: "face"}, 
              React.createElement(TracksView, {collection: this.props.collection})
            )
          ), 
          React.createElement("div", {className: "pole metalPole linearPole"}
          )
        )
      )
    }
  });//end signview

  views.SignView = SignView;

  //----------------------------------------- all tracks

  var TracksView = React.createBackboneClass({

    getTrack: function(model, index){
      //grabs each model from the TrackView
      return React.createElement(TrackView, {model: model, key: index})
    },
    //maps and renders each track to the tracksview
    render: function(){
      return (
        React.createElement("ul", {className: "tracks"}, 
          this.props.collection.map(this.getTrack)
        )
      )
    }
  });//end tracksview

  views.TracksView = TracksView;

  //----------------------------------------- ind track

  var TrackView = React.createBackboneClass({
    //take the sentence from the model
    getWord: function(word, index){
      return (
        React.createElement(WordView, {word: word, key: index})
      )
    },
    //splits on each space to get the word
    render: function(){
      return (
      React.createElement("li", null, 
        this.props.model.get("sentence").split(" ").map(this.getWord)
      )
      )
    }
  });//end trackview

  views.TrackView = TrackView;


  //----------------------------------------- ind word

  var WordView = React.createBackboneClass({
    // gets letter at the index, makes uppercase
    getLetter: function(letter, index){
      return (
        React.createElement("span", {key: index}, letter.toUpperCase())
      );
    },
    // splits word at the letterspace, maps it, then calls getletter 
    // gets the word from TrackView
    render: function() {
      return (
        React.createElement("div", {className: "word"}, 
           this.props.word.split("").map(this.getLetter) 
        )
      );
    }
  });// end wordview

  views.WordView = WordView;

})(signapp.views); // end function






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
        React.createElement("div", {className: "textfield"}, 
          React.createElement("div", null, 
            React.createElement("label", {htmlFor: htmlID}, label)
          ), 
          React.createElement("div", null, 
            React.createElement("input", {
            value: this.state.sentence, 
            type: type, name: name, 
            id: htmlID, 
            placeholder: "Enter Text", 
            onChange: this.onChange})
          )
        )
      );
    }

  });// end textfield


  // tracks form
  var TracksInput = React.createBackboneClass({

    //each textfield represents one model
    showTracks: function(model, index){
      return (
        React.createElement(TextField, {model: model, key: index, maxChars: "11"})
      )
    },

    render: function(){
      return (
        React.createElement("form", null, 
          React.createElement("div", {className: "size"}, 
            React.createElement(BoardSize, null), 
            React.createElement(LetterSize, null)
          ), 
          this.props.collection.map(this.showTracks), 
          React.createElement("div", {className: "add-remove"}, 
            React.createElement(AddTrack, {collection: this.props.collection}), 
            React.createElement(RemoveTrack, {collection: this.props.collection})
          ), 
          React.createElement(SelectStyle, null), 
          React.createElement(CharacterCount, {collection: this.props.collection})
        )
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
          React.createElement("span", {className: "add"}, 
            React.createElement("a", {href: "#", onClick: this.onAdd}, "+")
          )
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
            React.createElement("span", {className: "delete"}, 
              React.createElement("a", {href: "#", onClick: this.onRemove}, "-")
            )
      );
    }

  });//remove track


  //style selection
  var SelectStyle = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("div", {className: "style"}, 
          React.createElement("div", {className: "standard"}, 
            React.createElement("a", {href: "#"}, React.createElement("span", null, "C")), 
            React.createElement("h3", null, "Standard")
          ), 
          React.createElement("div", {className: "condensed"}, 
            React.createElement("a", {href: "#"}, React.createElement("span", null, "C")), 
            React.createElement("h3", null, "Condensed")
          ), 
          React.createElement("div", {className: "modern"}, 
            React.createElement("a", {href: "#"}, React.createElement("span", null, "C")), 
            React.createElement("h3", null, "Modern")
          )
        )
      );
    }

  });

  //Board width and height selection
  var BoardSize = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("div", {className: "board-width"}, 
          React.createElement("h3", null, "Board Width"), 
          React.createElement("select", null, 
            React.createElement("option", {value: "sixty"}, "60 in"), 
            React.createElement("option", {value: "seventy-two"}, "72 in"), 
            React.createElement("option", {value: "eighty-eight"}, "88 in"), 
            React.createElement("option", {value: "ninety-six"}, "96 in"), 
            React.createElement("option", {value: "one-twenty"}, "120 in")
          )
        )
      )
    }
  });

  //Letter height selection
  var LetterSize = React.createBackboneClass({

    render: function(){
      return (
        React.createElement("div", {className: "letter-height"}, 
          React.createElement("h3", null, "Letter Height"), 
          React.createElement("select", null, 
            React.createElement("option", {value: "six"}, "5 in"), 
            React.createElement("option", {value: "seven"}, "7 in"), 
            React.createElement("option", {value: "ten"}, "10 in")
          )
        )
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

      letters = letters.toUpperCase();
      letters = letters.replace(/ /g, "");
      letters = letters.split("");

      var grouped = _.groupBy(letters);
      var answer = {};

      _.each(grouped, function(value, key) {
        answer[key] = value.length;
      });

      return answer;
    },

    getChar: function(count, letter) {
      return (
        React.createElement("div", {key: letter, className: "total-chars"}, 
          React.createElement("span", {className: "count"}, count), 
          React.createElement("span", {className: "letter"}, letter)
        )
      );
    },

    render: function() {
      return (
        React.createElement("div", {className: "chars-count"}, 
          React.createElement("h3", null, "Total Letters Needed"), 
          React.createElement("hr", null), 
          React.createElement("div", null, _.map(this.state.charCounts, this.getChar))
        )
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


