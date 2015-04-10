$(function(){

  signapp.init();

  var saveCurentBoard = function(boardName) {
    var models = sentences.models;
    var data = sentences.toJSON();
    window.sentences = new signapp.models.FireTracks(null, {name: boardName});

    console.log("about to save, url is:", sentences.url());

    console.log("the models are:", models);
    console.log("the data is:", data);

    sentences.add(data);

    signView.setProps({collection: sentences});
    inputView.setProps({collection: sentences});
    signInView.setProps({collection: sentences});
  }

  window.sentences = new signapp.models.Tracks([{},{},{}]);

  var main = React.createElement(signapp.views.Main, {
    collection: sentences
  });

  var signin = React.createElement(signapp.views.Header, {
    model: signapp.currentUser,
    onSave: saveCurentBoard,
    collection: false
  });

  var signInView  = React.render(signin, document.querySelector('header'));
  var mainView = React.render(main, document.querySelector('.wrapper'))

  Backbone.history.start();

});