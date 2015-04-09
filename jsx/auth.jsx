(function(views){

  var TwitterLoggedIn = React.createClass({

    render: function(){
      return (
        <div className="logged-in" onClick={signapp.logout.bind(signapp)}>
          <img className="profile-image" src={this.props.img} alt=""/>
          {" "}
          <span>{this.props.name}</span>
          {" "}
          <views.Icon fa="sign-out"/>
        </div>
      )
    }
  }); //end logged in

   var TwitterNotLoggedIn = React.createClass({

    render: function() {
      return (
        <div className="not-logged-in" onClick={signapp.twitterLogin.bind(signapp)}>
          <span>Sign In With</span>
          {" "}
          <views.Icon fa="twitter"/>
        </div>
      );
    }

  });// end not logged in

  var TwitterLogIn = React.createBackboneClass({
    getChild: function(){
      if(signapp.isLoggedIn()) {
        var name = this.props.model.get("name");
        var img = this.props.model.get("profile_image_url");
        return <views.TwitterLoggedIn name={name} img={img}/>
      }
      else{
        return <views.TwitterNotLoggedIn/>
      }
    },

    render: function(){
      return (
        <div className="twitter-login">
          { this.getChild() }
        </div>
      );
    }
  });// end Log in

  var Header = React.createBackboneClass({
    render: function() {
      return (
        <div>
          <div className="logo">
            <h2>SignApp</h2>
          </div>
          <views.TwitterLogIn model={this.props.model}/>
        </div>
      );
    }
  }); //end header


  views.TwitterLoggedIn    = TwitterLoggedIn;
  views.TwitterNotLoggedIn = TwitterNotLoggedIn;
  views.TwitterLogIn       = TwitterLogIn;
  views.Header             = Header;

})(signapp.views);






