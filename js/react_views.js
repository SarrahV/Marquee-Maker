(function(views){

  var TwitterLoggedIn = React.createClass({displayName: "TwitterLoggedIn",

    render: function(){
      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "logged-in", onClick: signapp.logout.bind(signapp)}, 
            React.createElement("img", {className: "profile-image", src: this.props.img, alt: ""}), 
            " ", 
            React.createElement("span", null, this.props.name), 
            " ", 
            React.createElement(views.Icon, {fa: "sign-out"})
          ), 
          React.createElement("div", {className: "board-nav"}, 
            React.createElement(MyBoard, null), 
            React.createElement(SaveBoard, null)
          )
        )
      )
    }
  }); //end logged in

   var TwitterNotLoggedIn = React.createClass({displayName: "TwitterNotLoggedIn",

    render: function() {
      return (
        React.createElement("div", {className: "not-logged-in", onClick: signapp.twitterLogin.bind(signapp)}, 
          React.createElement("span", null, "Sign In With"), 
          " ", 
          React.createElement(views.Icon, {fa: "twitter"}), 
          " ", 
          React.createElement("span", null, "to Save")
        )
      );
    }

  });// end not logged in

  var TwitterLogIn = React.createBackboneClass({
    getChild: function(){
      if(signapp.isLoggedIn()) {
        var name = this.props.model.get("name");
        var img = this.props.model.get("profile_image_url");
        return React.createElement(views.TwitterLoggedIn, {name: name, img: img})
      }
      else{
        return React.createElement(views.TwitterNotLoggedIn, null)
      }
    },

    render: function(){
      return (
        React.createElement("div", {className: "twitter-login"}, 
          React.createElement("div", {className: "logo"}, 
            React.createElement("h2", null, "SignApp")
          ), 
           this.getChild() 
        )
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
        React.createElement("div", null, 
          React.createElement("form", {className: "board-save"}, 
             React.createElement("input", {placeholder: "Name Your Board"}), 
             React.createElement("input", {type: "submit", value: "Submit"})
          )
        )
      );
    }

  });// end board form

  var SaveBoard = React.createBackboneClass({

    saveBoard: function() {
      e.preventDefault();
      //show the board form and hide the buttons
    },

    render: function() {
      return(
        React.createElement("div", null, 
          React.createElement("button", {className: "save", onClick: this.saveBoard}, "Save Current Board")
        )
      );
    }

  });// end save board

  var MyBoard = React.createBackboneClass({

    viewBoards: function() {

      //need to detach view of current board and show (?how am I showing each board!?) of all boards

    },

    render: function() {
      return(
         React.createElement("button", {className: "myboard", onClick: this.viewBoards}, "My Boards")
      );
    }
  });// end my board

  var Header = React.createBackboneClass({
    render: function() {
      return (
        React.createElement("div", null, 
            React.createElement(views.TwitterLogIn, {model: this.props.model})
        )
      );
    }
  }); //end header


  views.TwitterLoggedIn    = TwitterLoggedIn;
  views.TwitterNotLoggedIn = TwitterNotLoggedIn;
  views.TwitterLogIn       = TwitterLogIn;
  views.Header             = Header;

})(signapp.views);







(function(views) {

  views.Icon = React.createClass({displayName: "Icon",

    render: function() {
      // create the font awesome class
      var cssClass = "fa fa-" + this.props.fa;
      // add spin effect 
      if (this.props.spin) {
        cssClass += " fa-spin";
      }

      return React.createElement("i", {className: cssClass})
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
        React.createElement(WordView, {word: word, key: index, className: this.props.model.get("cssClass")})
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

  var WordView = React.createBackboneClass({
    // gets letter at the index, makes uppercase
    getLetter: function(letter, index){
      return (
        React.createElement("span", {key: index, className: this.props.className}, letter.toUpperCase())
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

  views.WordView = WordView;

})(signapp.views); // end function






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
        React.createElement("div", {className: "textfield"}, 
          React.createElement("div", null, 
            React.createElement("label", {htmlFor: htmlID}, label)
          ), 
          React.createElement("div", null, 
            React.createElement("input", {
            value: this.state.sentence, 
            type: type, name: name, 
            id: htmlID, 
            placeholder: "Enter Text", 
            onChange: this.onChange})
          )
        )
      );
    }

  });// end textfield


//-----------------------------------------------------tracks form
  var TracksInput = React.createBackboneClass({

    getInitialState: function() {
      return {
        letterSize: "6 on 7",
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
        React.createElement(TextField, {model: model, key: index, maxChars: "11"})
      )
    },

    render: function(){
      return (
        React.createElement("form", null, 
          React.createElement("div", {className: "size"}, 
            React.createElement(LetterSize, {onChange: this.onSizeChange, selected: this.state.letterSize, collection: this.props.collection})
          ), 
          this.props.collection.map(this.showTracks), 
          React.createElement("div", {className: "add-remove"}, 
            React.createElement(AddTrack, {collection: this.props.collection}), 
            React.createElement(RemoveTrack, {collection: this.props.collection})
          ), 
          React.createElement(SelectStyle, {selected: this.state.style, onStyle: this.setStyle, collection: this.props.collection}), 
          React.createElement(CharacterCount, {style: this.state.style, letterSize: this.state.letterSize, collection: this.props.collection})
        )
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
          React.createElement("span", {className: "add"}, 
            React.createElement("a", {href: "#", onClick: this.onAdd}, "+")
          )
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
            React.createElement("span", {className: "delete"}, 
              React.createElement("a", {href: "#", onClick: this.onRemove}, "-")
            )
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
        React.createElement("div", {className: "style"}, 
          React.createElement("div", {className: this.props.selected === "stand" ? "standard selected" : "standard"}, 
            React.createElement("a", {href: "#", onClick: this.onClick.bind(this, "stand")}, React.createElement("span", null, "C")), 
            React.createElement("h3", null, "Standard")
          ), 
          React.createElement("div", {className: this.props.selected === "cond" ? "condensed selected" : "condensed"}, 
            React.createElement("a", {href: "#", onClick: this.onClick.bind(this, "cond")}, React.createElement("span", null, "C")), 
            React.createElement("h3", null, "Condensed")
          ), 
          React.createElement("div", {className: this.props.selected === "mod" ? "modern selected" : "modern"}, 
            React.createElement("a", {href: "#", onClick: this.onClick.bind(this, "mod")}, React.createElement("span", null, "C")), 
            React.createElement("h3", null, "Modern")
          )
        )
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
        React.createElement("div", {className: "letter-height"}, 
          React.createElement("h3", null, "Letter Height"), 
          React.createElement("select", {onChange: this.onChange}, 
            React.createElement("option", {selected: this.props.selected === "4 on 5", value: "4 on 5"}, "5 in Panel"), 
            React.createElement("option", {selected: this.props.selected === "6 on 7", value: "6 on 7"}, "7 in Panel"), 
            React.createElement("option", {selected: this.props.selected === "8 on 10", value: "8 on 10"}, "10 in Panel")
          )
        )
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
      return (
        React.createElement("div", {key: letter, className: "total-chars"}, 
          React.createElement("span", {className: "count"}, count), 
          React.createElement("span", {className: "letter"}, letter)
        )
      );
    },

    getBuyNowButton: function() {
      if (_.values(this.state.charCounts).length) {
        return React.createElement("button", {onClick: this.buyNow}, "Buy Now!");
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
        React.createElement("div", {className: "chars-count"}, 
          React.createElement("h3", null, "Total Letters Needed"), 
          React.createElement("hr", null), 
          React.createElement("div", null, _.map(this.state.charCounts, this.getChar)), 
          this.getBuyNowButton()
        )
      )
    }

  });
  
  views.CharacterCount = CharacterCount;
  views.SelectStyle    = SelectStyle;
  views.LetterSize     = LetterSize;
  views.TextField      = TextField;
  views.TracksInput    = TracksInput;

})(signapp.views);


