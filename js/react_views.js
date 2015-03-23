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

  //----------------------------------------- all tracks

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

  //----------------------------------------- ind track

  var TrackView = React.createBackboneClass({
    render: function(){
      return (
      React.createElement("li", null, React.createElement(LetterView, null))
      )
    }
  });//end trackview

  views.TrackView = TrackView;


  //----------------------------------------- ind letter

  var LetterView = React.createBackboneClass({
    render: function(){
      return (
        React.createElement("span", null, "A")
      )
    }
  });// end letterview

  views.LetterView = LetterView

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
            React.createElement("input", {type: type, name: name, id: htmlID})
          )
        )
      );
    }

  });// end textfield


  // tracks form
  var TrackInput = React.createClass({displayName: "TrackInput",

    render: function(){
      return (
        React.createElement("form", null, 
          "// minimum of 2 tracks to start", 
          React.createElement(TextField, {name: "track", label: "Line 1"}), 
          React.createElement(TextField, {name: "track", label: "Line 2"}), 
          React.createElement("button", null, "Add a Line +"), 
          React.createElement("button", null, "Done")
        )
      );
    }
  });

  views.TrackInput = TrackInput;

})(signapp.views);


