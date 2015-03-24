(function(views){

  // need this? Can't access other one...scope
  var TextField = React.createClass({displayName: "TextField",

    render: function(){
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.typs || "text";
      return (
        React.createElement("div", {className: "textfield"}, 
          React.createElement("div", null, 
            React.createElement("label", {htmlFor: htmlID}, label)
          ), 
          React.createElement("div", null, 
            React.createElement("input", {type: type, name: name, id: htmlID})
          )
        )
      );
    }
  });//end textfield

  var Login = React.createClass({displayName: "Login",

    onSubmit: function(e){
      e.preventDefault();
      var loginData = $(e.target).serializeJSON();
      signapp.login(loginData);
    },

    render: function(){
      return (
        React.createElement("form", {onSubmit: this.onSubmit}, 
          React.createElement(TextField, {name: "email", label: "Email"}), 
          React.createElement(TextField, {name: "password", label: "Password", type: "password"}), 

          React.createElement("button", null, "Sign In")
        )
      );
    }
  });//end login

  var LogoutButton = React.createClass({displayName: "LogoutButton",
    onClick: function(e){
      e.preventDefault();
      signapp.logout();
    },
    render: function(){
      return React.createElement("button", {onClick: this.onClick}, "Logout");
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

  var WordView = React.createClass({displayName: "WordView",
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

})(signapp.views = {}); // end function






(function(views){

  // textfield 
  var TextField = React.createClass({displayName: "TextField",

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
            React.createElement("input", {type: type, name: name, id: htmlID}), "//on change set model sentence to new value from input"
          )
        )
      );
    }

  });// end textfield


  // tracks form
  var TrackInput = React.createClass({displayName: "TrackInput",

    showTracks: function(model, index){

    },

    render: function(){
      return (
        React.createElement("form", null, 
        "//show input for each model in collection", 
          React.createElement("button", null, "Add a Line +"), "// needs to add new model to collection", 
          React.createElement("button", null, "Remove Line -"), 
          React.createElement("button", null, "Done")
        )
      );
    }
  });

  views.TrackInput = TrackInput;

})(signapp.views);


