(function(views){

  // need this? Can't access other one...scope
  var TextField = React.createClass({

    render: function(){
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.typs || "text";
      return (
        <div className="textfield">
          <div>
            <label htmlFor={htmlID}>{label}</label>
          </div>
          <div>
            <input type={type} name={name} id={htmlID}/>
          </div>
        </div>
      );
    }
  });//end textfield

  var Login = React.createClass({

    onSubmit: function(e){
      e.preventDefault();
      var loginData = $(e.target).serializeJSON();
      signapp.login(loginData);
    },

    render: function(){
      return (
        <form onSubmit={this.onSubmit}>
          <TextField name="email" label="Email"/>
          <TextField name="password" label="Password" type="password"/>

          <button>Sign In</button>
        </form>
      );
    }
  });//end login

  var LogoutButton = React.createClass({
    onClick: function(e){
      e.preventDefault();
      signapp.logout();
    },
    render: function(){
      return <button onClick={this.onClick}>Logout</button>;
    }
  });

})(signapp.views);