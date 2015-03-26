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

  views.TwitterLogin = React.createBackboneClass({
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
          React.createElement("div", {className: "logo"}, "CrapApp"), 
          React.createElement(views.TwitterLogin, {model: this.props.model})
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

})(signapp.views); // end function






(function(views){

  // textfield 
  var TextField = React.createBackboneClass({

    onChange: function (event) {
      this.props.model.set("sentence", event.target.value);
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
            React.createElement("input", {type: type, name: name, id: htmlID, placeholder: "Enter Text", onChange: this.onChange})
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
        React.createElement(TextField, {model: model, key: index})
      )
    },

    render: function(){
      return (
        React.createElement("form", null, 
          this.props.collection.map(this.showTracks), 
          React.createElement("button", null, "Add a Line +"), 
          React.createElement("button", null, "Remove Line -"), 
          React.createElement("button", null, "Done")
        )
      );
    }
  });// end trackinput


  views.TextField  = TextField;
  views.TracksInput = TracksInput;

})(signapp.views);


