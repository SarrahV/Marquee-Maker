(function(views){

//-----------------------------------------------------textfield 
  var TextField = React.createBackboneClass({

    getDefaultProps: function() {
      return {
        maxChars: 5
      };
    },

    getInitialState: function() {
      return {
        sentence: ""
      };
    },

    onChange: function (event) {
      var sentence = event.target.value;
      sentence = sentence.substr(0, this.props.maxChars);
      this.setState({sentence: sentence});
      this.props.model.set("sentence", sentence);

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
            <input
            value={this.state.sentence} 
            type={type} name={name} 
            id={htmlID} 
            placeholder="Enter Text" 
            onChange={this.onChange}/>
          </div>
        </div>
      );
    }

  });// end textfield


//-----------------------------------------------------tracks form
  var TracksInput = React.createBackboneClass({

    getInitialState: function() {
      return {
        letterSize: "4 on 5",
        style: "stand"
      }
    },

    onSizeChange: function(e) {
      this.setState({letterSize: e.target.value});
    },

    setStyle: function(styleName) {
      this.setState({style: styleName});
    },

    //each textfield represents one model
    showTracks: function(model, index){
      return (
        <TextField model={model} key={index} maxChars="11" />
      )
    },

    render: function(){
      return (
        <form>
          <div className="size">
            <LetterSize onChange={this.onSizeChange} selected={this.state.letterSize} collection={this.props.collection}/>
          </div>
          {this.props.collection.map(this.showTracks)}
          <div className="add-remove">
            <AddTrack collection={this.props.collection}/>
            <RemoveTrack collection={this.props.collection}/>
          </div>
          <SelectStyle selected={this.state.style} onStyle={this.setStyle} collection={this.props.collection}/>
          <CharacterCount style={this.state.style} letterSize={this.state.letterSize} collection={this.props.collection} />
        </form>
      );
    }
  });// end trackinput

//-----------------------------------------------------add a track 
  var AddTrack = React.createBackboneClass({

    onAdd: function(e){
      e.preventDefault();
      this.props.collection.add({});
    },

    render: function(){
      return (
          <span className="add">
            <a href="#" onClick={this.onAdd}><views.Icon fa="plus-square"/></a>
          </span>
      );
    }

  });//end add track


//-----------------------------------------------------remove a track
  var RemoveTrack = React.createBackboneClass({

    onRemove: function(e){
       e.preventDefault();
       this.props.collection.pop();
    },
    
    render: function(){
      return (
            <span className="delete">
              <a href="#" onClick={this.onRemove}><views.Icon fa="minus-square"/></a>
            </span>
      );
    }

  });//remove track


//-----------------------------------------------------style selection

  var SelectStyle = React.createBackboneClass({

    onClick: function(className, e){
      e.preventDefault();
      this.props.collection.each(function(model){

        model.set("cssClass", className);

      });
      this.props.onStyle(className);
    },

    render: function(){
      return (
        <div className="style">
          <div className={this.props.selected === "stand" ? "standard selected" : "standard"}>
            <a href="#" onClick={this.onClick.bind(this, "stand")}><span>C</span></a>
            <h3>Standard</h3>
          </div>
          <div className={this.props.selected === "cond" ? "condensed selected" : "condensed"}>
            <a href="#" onClick={this.onClick.bind(this, "cond")}><span>C</span></a>
            <h3>Condensed</h3>
          </div>
          <div className={this.props.selected === "mod" ? "modern selected" : "modern"}>
            <a href="#" onClick={this.onClick.bind(this, "mod")}><span>C</span></a>
            <h3>Modern</h3>
          </div>
        </div>
      );
    }

  });

//----------------------------------------------------- Letter height selection
  var LetterSize = React.createBackboneClass({

    onChange: function(e){
      this.props.onChange(e);
    },

    render: function(){
      return (
        <div className="letter-height">
          <h3>Choose Letter Height</h3>
          <select onChange={this.onChange}>
            <option selected={this.props.selected === "4 on 5"} value="4 on 5">5 in Panel</option>
            <option selected={this.props.selected === "6 on 7"} value="6 on 7">7 in Panel</option>
            <option selected={this.props.selected === "8 on 10"} value="8 on 10">10 in Panel</option>
          </select>
        </div>
      )
    }
  });

//----------------------------------------------------- Count of characters used
  var CharacterCount = React.createBackboneClass({

    componentWillMount: function() {
      this.props.collection.on("change", function(){

        this.setState({
          charCounts: this.getCharCount()
        });

      }, this);
    },

    getInitialState: function() {
      return {
        charCounts: {}
      }
    },

    getCharCount: function() {
      var sentences = this.props.collection.pluck("sentence"); 
      var letters = sentences.join("");

      letters = letters.toUpperCase();
      letters = letters.replace(/ /g, "");
      letters = letters.split("");

      var grouped = _.groupBy(letters);
      var answer = {};

      _.each(grouped, function(value, key) {
        answer[key] = value.length;
      });

      return answer;
    },

    getChar: function(count, letter) {
      var className = "total-chars " + this.props.style;
      return (
        <div className="letter-row">
          <div key={letter} className={className}>
            <span className="letter" data-count={count}>{letter}</span>
            <span className="letter-back"></span>
          </div>
        </div>
      );
    },

    getCharHeader: function() {
      if (_.values(this.state.charCounts).length) {
        return <h3>Total Letters Needed</h3>;
      }
      else {
        return false;
      }
    },

    getBuyNowButton: function() {
      if (_.values(this.state.charCounts).length) {
        return (
          <div>
            <button onClick={this.buyNow}>Buy Letters*</button>
            <div className="disclaimer">
              <p>*You will be redirected to the National Readerboard website to purchase
              the selected letters. No account required.</p>
            </div>
          </div>
        )
      }
      else {
        return false;
      }
    },

    buyNow: function(e) {
      e.preventDefault();

      var letters = _.reduce(this.state.charCounts, function(arr, count, letter){
        _.each(_.range(count), function(){
          arr.push(letter);
        });
        return arr;
      }, []);

      var items = [];

      _.each(letters, function(letter) {

        var obj = _.find(letterOrderData, function(orderData){
          if (orderData.style !== this.props.style) {
            return false
          }
          if (orderData.size !== this.props.letterSize) {
            return false
          }
          if (orderData.char !== letter) {
            return false
          }
          return true;
        }, this);

        if (obj) {
          items.push(obj["variant-id"]);
        }
        
      }, this);

      items = _.compact(items);

      if (items.length) {
        this.sendToCart(items);
      } else {
        alert("Nothing to add to cart");
      }
    },

    sendToCart: function(items) {
      var f = document.createElement('form'); 
      f.style.display = 'none'; 
      
      document.body.appendChild(f); 
      
      f.method = 'POST'; 
      f.action = "http://www.nationalreaderboard.com/cart/add";
      
      items.forEach(function(itemID){
        var v = document.createElement('input'); 
        v.setAttribute('type', 'hidden'); 
        v.setAttribute('name', 'id[]'); 
        v.setAttribute('value', itemID); 
        f.appendChild(v);
      });

      f.submit();
    },

    render: function() {
      return (
        <div className="chars-count">
          {this.getCharHeader()}
          <hr/>
          <div>{_.map(this.state.charCounts, this.getChar)}</div>
          {this.getBuyNowButton()}
        </div>
      )
    }

  });
  
  views.CharacterCount = CharacterCount;
  views.SelectStyle    = SelectStyle;
  views.LetterSize     = LetterSize;
  views.TextField      = TextField;
  views.TracksInput    = TracksInput;

})(signapp.views);


