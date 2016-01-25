$(document).on('click', '.toggle-button', function() {
    $(this).toggleClass('toggle-button-selected');
});

var options = 2;
var factors = 3;

var points = [];
var min-max = [];
var min-max-val = [];

function findMinMax(){
  for(var i = 1; i < options; i++){
    for(var j = 1; j < factors; j++){
      var x = document.getElementByName("a"+i+j)
    }
  }
}
