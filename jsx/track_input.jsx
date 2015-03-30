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
        <div className="textfield">
          <div>
            <label htmlFor={htmlID}>{label}</label>
          </div>
          <div>
            <input type={type} name={name} id={htmlID} placeholder="Enter Text" onChange={this.onChange}/>
          </div>
        </div>
      );
    }

  });// end textfield


  // tracks form
  var TracksInput = React.createBackboneClass({

    //each textfield represents one model
    showTracks: function(model, index){
      return (
        <TextField model={model} key={index} />
      )
    },

    render: function(){
      return (
        <form>
          {this.props.collection.map(this.showTracks)}
          <div className="add-remove">
            <span><a href="#">+</a> / <a href="#">-</a></span>
          </div>
        </form>
      );
    }
  });// end trackinput


  views.TextField  = TextField;
  views.TracksInput = TracksInput;

})(signapp.views);


