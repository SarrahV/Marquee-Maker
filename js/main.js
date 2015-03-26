$(function(){

  signapp.init();

  window.sentences = new signapp.models.Tracks([{},{},{}]);

  var sign = React.createElement(signapp.views.SignView, {
    collection: sentences
  });

  var input = React.createElement(signapp.views.TracksInput, {
    collection: sentences
  });

  var signin = React.createElement(signapp.views.Header, {
    model: signapp.currentUser
  });

  React.render(signin, document.querySelector('header'));
  React.render(sign, document.querySelector('.main'));
  React.render(input, document.querySelector('aside'));

  Backbone.history.start();

});