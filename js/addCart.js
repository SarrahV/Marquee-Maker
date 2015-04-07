var items = ["746995165", "746995165", "746991989"];
var f = document.createElement('form'); 
f.style.display = 'none'; 
document.body.appendChild(f); 
f.method = 'POST'; 
f.action = "http://www.nationalreaderboard.com/cart/add";
items.forEach(function(itemID){
  var v = document.createElement('input'); 
  v.setAttribute('type', 'hidden'); 
  v.setAttribute('name', 'id[]'); 
  v.setAttribute('value', itemID); 
  f.appendChild(v);
});
 
//f.submit(); 