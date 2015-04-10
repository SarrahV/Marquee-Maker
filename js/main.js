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

    mainView.setProps({collection: sentences});
    signInView.setProps({collection: sentences});
  }

  var showUserBoards = function() {
    console.log("should now be showing user boards");
    var boards = new signapp.models.FireBoards();
    mainView.setProps({
      boards: boards,
      showBoards: true
    });
  }

  var showBoard = function(boardName) {
    window.sentences = new signapp.models.FireTracks(null, {name: boardName});

    mainView.setProps({
      collection: sentences,
      showBoards: false,
      boards: false
    });
    signInView.setProps({collection: sentences});
  }

  window.sentences = new signapp.models.Tracks([{},{},{}]);

  var main = React.createElement(signapp.views.Main, {
    collection: sentences,
    onBoardSelect: showBoard
  });

  var signin = React.createElement(signapp.views.Header, {
    model: signapp.currentUser,
    onSave: saveCurentBoard,
    onViewBoards: showUserBoards,
    collection: false
  });

  var signInView  = React.render(signin, document.querySelector('header'));
  var mainView = React.render(main, document.querySelector('.wrapper'))

  // Backbone.history.start();

});