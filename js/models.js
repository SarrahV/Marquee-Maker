(function(models){

  //----------------------------------------- ind track
  var SignTrack = Backbone.Model.extend({
    defaults: {
      sentence: " "
    }
  });

  //----------------------------------------- track collection
  var Tracks = Backbone.Collection.extend({
    model: SignTrack
  });

  models.SignTrack = SignTrack;
  models.Tracks    = Tracks;

})(signapp.models);