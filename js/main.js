$(function(){

  window.sentences = new signapp.models.Tracks([{},{}]);

  var elem = React.createElement(signapp.views.SignView, {
    collection: sentences
  });

  React.render(elem, document.querySelector('.main'));


});