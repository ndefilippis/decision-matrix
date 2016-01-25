
var options = 3;
var factors = 3;

var points = [];
var isMin = [];
var minVal = [];
var maxVal = [];

function calculate(){
  points = []
  isMin = [];
  minVal = [];
  maxVal = [];
  for(var i = 1; i <= factors; i++){
    var MinMaxRadio = document.getElementsByName("m"+i)[0];
    if(MinMaxRadio.checked){
      isMin.push(true);
    }
    else{
      isMin.push(false);
    }
  }
  findMinMax();

  for(var i = 1; i <= options; i++){
    points.push(0);
    for(var j = 1; j <= factors; j++){
      var weight = parseInt(document.getElementsByName("w"+j)[0].value);
      if(isMin[j]){
        var val = parseInt(document.getElementsByName("v"+i+j)[0].value);
        points[i-1]+=weight*(maxVal[j-1] - val)/(maxVal[j-1]-minVal[j-1]);
      }
      else{
        var val = parseInt(document.getElementsByName("v"+i+j)[0].value);
        points[i-1]+=weight*(val-minVal[j-1])/(maxVal[j-1] - minVal[j-1]);
      }
    }

  }
  for(var i = 0; i < options; i++){
    console.log(points[i]);
    document.getElementById("results").value += "<li>points[i]</li>";
  }

}

function findMinMax(){
  for(var i = 1; i <= factors; i++){
      var min = parseInt(document.getElementsByName("v1"+i)[0].value);
      for(var j = 1; j <= options; j++){
        var x = document.getElementsByName("v"+j+i)[0];
        if(parseInt(x.value) < min){
          min = parseInt(x.value);
        }
      }
      minVal.push(min)
      var max = parseInt(document.getElementsByName("v1"+i)[0].value);
      for(var j = 1; j <= options; j++){
        var x = document.getElementsByName("v"+j+i)[0];
        if(parseInt(x.value) > max){
          max = parseInt(x.value);
        }
      }
      maxVal.push(max)
    }
}
