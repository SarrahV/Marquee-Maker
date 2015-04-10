(function(views){

  var TwitterLoggedIn = React.createClass({

    getInitialState: function() {
      return { showBoardForm: false }
    },

    onClick: function() {
      this.setState( { showBoardForm: true });
    },

    onSave: function(newBoardName) {
      this.setState( { showBoardForm: false });
      this.props.onSave(newBoardName);
    },

    getSaveButton: function() {
      if (this.props.board) {
        return <div className="autoSave">Auto saving board: {this.props.board}</div>
      } else {
        return <button onClick={this.onClick} className="save">Save Current Board</button>
      }
    },

    getBoardNav: function() {
      if (this.state.showBoardForm) {
        return (
          <div className="board-nav">
            <BoardForm onSave={this.onSave}/>
          </div>
        );
      }
      else {
        return (
          <div className="board-nav">
            <MyBoard/>
            <div>
              {this.getSaveButton()}
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
    onSave: function(newBoardName) {
      this.props.onSave(newBoardName);
    },

    getChild: function(){
      if(signapp.isLoggedIn()) {
        var name = this.props.model.get("name");
        var img = this.props.model.get("profile_image_url");
        return <views.TwitterLoggedIn board={this.props.board} onSave={this.onSave} name={name} img={img}/>
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

  var BoardList = React.createBackboneClass({

    getItem: function(model, index) {
        
    },

    render: function() {
      return (
        <div className="myList">
          <div className="items">
            { this.props.collection.map(this.getItem) }
          </div>
        </div>
      );
    }

  });// end board list

  var MyBoard = React.createBackboneClass({

    viewBoards: function(e) {
      
    },

    render: function() {
      return(
         <button className="myboard" onClick={this.viewBoards}>My Boards</button>
      );
    }
  });// end my board

  var BoardForm = React.createBackboneClass({

    nameBoard: function(e) {
      e.preventDefault();

      var name = this.refs.boardname.getDOMNode().value;

      this.props.onSave(name);

    },

    render: function() {
      return(
        <div className="board-save">
          <form onSubmit={this.nameBoard}>
             <input ref="boardname" placeholder="Name Your Board"/>
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

  var Header = React.createBackboneClass({
    onSave: function(newBoardName) {
      this.props.onSave(newBoardName);
    },

    render: function() {
      return (
        <div>
            <views.TwitterLogIn board={this.props.collection.name} onSave={this.onSave} model={this.props.model}/>
        </div>
      );
    }
  }); //end header


  views.TwitterLoggedIn    = TwitterLoggedIn;
  views.TwitterNotLoggedIn = TwitterNotLoggedIn;
  views.TwitterLogIn       = TwitterLogIn;
  views.Header             = Header;
  views.BoardList          = BoardList;

})(signapp.views);






