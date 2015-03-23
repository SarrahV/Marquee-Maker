(function(views){

  // textfield 
  var TextField = React.createClass({

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
            <input type={type} name={name} id={htmlID} />
          </div>
        </div>
      );
    }

  });// end textfield


  // tracks form
  var TrackInput = React.createClass({

    render: function(){
      return (
        <form>
          // minimum of 2 tracks to start
          <TextField name="track" label="Line 1"/>
          <TextField name="track" label="Line 2"/>
          <button>Add a Line +</button>
          <button>Done</button>
        </form>
      );
    }
  });

  views.TrackInput = TrackInput;

})(signapp.views);


