(function(models){

  var SignTrack = Backbone.Model.extend({

    initialize: function(){
            console.log("I am a sign track");
        }

  });

  var Tracks = Backbone.Collection.extend({

  });

  models.SignTrack = SignTrack;
  models.Tracks    = Tracks;

})(signapp.models = {});