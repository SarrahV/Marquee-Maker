(function(views){

  var TwitterLoggedIn = React.createClass({

    getInitialState: function() {
      return { showBoardForm: false }
    },

    onClick: function() {
      this.setState( { showBoardForm: true });
      console.log("you clicked me");
    },

    getBoardNav: function() {
      if (this.state.showBoardForm) {
        return (
          <div className="board-nav">
            <BoardForm/>
          </div>
        );
      }
      else {
        return (
          <div className="board-nav">
            <MyBoard/>
            <div>
              <button onClick={this.onClick} className="save">Save Current Board</button>
            </div>
          </div>
        );
      }
    },

    render: function(){
      return (
        <div>
          <div className="logged-in" onClick={signapp.logout.bind(signapp)}>
            <img className="profile-image" src={this.props.img} alt=""/>
            {" "}
            <span>{this.props.name}</span>
            {" "}
            <views.Icon fa="sign-out"/>
          </div>
          {this.getBoardNav()}
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
          {" "}
          <span>to Save</span>
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
          <div className="logo">
            <h2>SignApp</h2>
          </div>
          { this.getChild() }
        </div>
      );
    }
  });// end Log in

  var BoardForm = React.createBackboneClass({

    nameBoard: function() {
      e.preventDefault();
      //create a new firebase collection
      //take models from BB collection and put them into the FB collection
      //make the UI switch to a view of the FB collection

      //once saved - save button needs to say "Auto Saving"

    },

    render: function() {
      return(
        <div className="board-save">
          <form>
             <input placeholder="Name Your Board"/>
             <input type="submit" value="Submit"/>
          </form>
        </div>
      );
    }

  });// end board form

  var SaveBoard = React.createBackboneClass({

    render: function() {
      return(
        <div>
          <button className="save">Save Current Board</button>
        </div>
      );
    }

  });// end save board

  var MyBoard = React.createBackboneClass({

    viewBoards: function() {

      //need to detach view of current board and show (?how am I showing each board!?) all boards

    },

    render: function() {
      return(
         <button className="myboard" onClick={this.viewBoards}>My Boards</button>
      );
    }
  });// end my board

  var Header = React.createBackboneClass({
    render: function() {
      return (
        <div>
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






