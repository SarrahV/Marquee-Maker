window.signapp = {

  // namespace for views
  views: {},

  //namespace for models
  models: {},

  // raw authentication data
  authData: null,

  // user model
  currentUser: null,

  // base firebase url
  firebaseURL: "https://nrs-sign-app.firebaseio.com/",

  //firebase connection reference
  fireRef: null,

  // set everything up
  init: function() {

    // add backbone events
    _.extend(this, Backbone.Events);

    // create a model to store our current user
    this.currentUser = new Backbone.Model();

    // connect to firebase
    this.fireRef = new Firebase(this.firebaseURL);

    // give firebase a callback when a user signs in or out
    this.fireRef.onAuth(this.onAuthCallback);
  },

  //callback when user logs in or out
  onAuthCallback: function(authData){
    if(authData) {
      signapp.authData = authData;
      signapp.currentUser.set(authData.twitter.cachedUserProfile);
      signapp.trigger("sign:in");
    } else {
      signapp.authData = null;
      signapp.currentUser.clear();
      signapp.trigger("sign:out");
    }
    signapp.trigger("sign:in:out");
  },

  //log in to twitter
  twitterLogin: function() {
    console.log(this);
    this.fireRef.authWithOAuthRedirect("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed", error);
      } else {
        console.log("Authenticated successfully:", authData);
      }
    });
  },

  isLoggedIn: function() {
    return !!(this.authData && this.authData.uid);
  },

  logout: function() {
    this.fireRef.unauth();
  }


};















