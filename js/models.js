(function(models){

  //----------------------------------------- ind track
  var SignTrack = Backbone.Model.extend({
    defaults: {
      sentence: " ",
      cssClass: "stand"
    }
  });

  //----------------------------------------- track collection
  var Tracks = Backbone.Collection.extend({
    model: SignTrack
  });


  // //----------------------------------------- firebase track collection
  var FireTracks = Backbone.Firebase.Collection.extend({
    model: SignTrack,

    url: function() {
      if(!signapp.authData || !signapp.authData.uid) {
        throw new Error("I need a user!");
      }
      var uid = signapp.authData.uid;
      return signapp.firebaseURL + "users/" + uid + "/boards/" + this.name;
    },

    initialize: function(data, opts) {
      opts || (opts = {});
      this.name = opts.name;
    }

  });

  var FireBoards = Backbone.Firebase.Model.extend({
    url: function() {
      if(!signapp.authData || !signapp.authData.uid) {
        throw new Error("I need a user!");
      }
      var uid = signapp.authData.uid;
      return signapp.firebaseURL + "users/" + uid + "/boards";
    },

    getNames: function() {
      var names = _.reject(this.keys(), function(k){
        return k === "id";
      });
      console.log("names", names);
      return names;
    }
  });

  models.FireTracks  = FireTracks;
  models.FireBoards  = FireBoards;
  models.SignTrack   = SignTrack;
  models.Tracks      = Tracks;

})(signapp.models);