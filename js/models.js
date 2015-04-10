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
      var uid = encodeURIComponent(signapp.authData.uid);
      return signapp.firebaseURL + "/" + uid + "/boards";
    }

  });

  models.SignTrack   = SignTrack;
  models.Tracks      = Tracks;
  //models.FireTracks  = FireTracks;

})(signapp.models);