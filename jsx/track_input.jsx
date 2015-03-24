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
            <input type={type} name={name} id={htmlID} />//on change set model sentence to new value from input
          </div>
        </div>
      );
    }

  });// end textfield


  // tracks form
  var TrackInput = React.createClass({

    showTracks: function(model, index){

    },

    render: function(){
      return (
        <form>
        //show input for each model in collection
          <button>Add a Line +</button>// needs to add new model to collection
          <button>Remove Line -</button>
          <button>Done</button>
        </form>
      );
    }
  });

  views.TrackInput = TrackInput;

})(signapp.views);


