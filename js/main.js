$(function(){

  window.sentences = new signapp.models.Tracks([{},{},{}]);

  var elem = React.createElement(signapp.views.SignView, {
    collection: sentences
  });

  var text = React.createElement(signapp.views.TracksInput, {
    collection: sentences
  });

  React.render(elem, document.querySelector('.main'));
  React.render(text, document.querySelector('aside'));

});