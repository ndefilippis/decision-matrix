
var options = 3;
var factors = 3;

var points = [];
var isMin = [];
var minVal = [];
var maxVal = [];
function addColumn(){
  factors++;
  generateTable();
}
function addRow(){
  options++;
  generateTable();
}
function generateTable(){
  var div = document.getElementById("matrix-wrapper");
  var content = "<form class = \"matrix\">"
  content += "<table>"

  content += "<thead>"
  content += generateTableHead();
  content += generateTableMinMax();
  content += generateTableWeights();
  content += "</thead>"
  for(var i = 1; i <= options; i++){
    content += "<tr>"
    content += "<th><input type = \"text\" name=\"a"+i+"\" value=\"Option"+i+"\"></input></th>"
    for(var j = 1; j <= factors; j++){
      content += "<td>";
      content += "<input type=\"number\" name=\"v"+i+j+"\" value=\"0\"></input>"
      content += "</td>"
    }
    content += "</tr>"
  }
  content += generateTableCalc()
  content += "</table>"
  content += "</form>"
  div.innerHTML = content;
}

function generateTableHead(){
  var content = "<th><label>Factors</label></th>";
  for(var i = 1; i <= factors; i++){
    content += "<th>";
    content += "<input name = f"+i+" type=\"text\" value = \"Factor "+i+"\"></input>";
    content += "</th>";
  }
  content += "<td class = \"add-wrapper\">";
  content += "<form class=\"add add-option\">";
  content += "<button class=\"btn\" type = \"button\" onclick=\"addColumn()\"><i class=\"add-col fa fa-plus-circle \"></i></button>";
  content += "</form>";
  content += "</td>";
  content += "</tr>";

  return content;
}
function generateTableMinMax(){
  var content = "<tr>";
  content += "<th><label>Min/Max</label></th>";
  for(var i = 1; i <= factors; i++){
    content += "<td>";
    content += "<input type=\"checkbox\" name=\"m"+i+"\">Min</input>";
    content += "</td>";
  }
  content += "</tr>";
  return content;
}
function generateTableWeights(){
  var content = "<tr>";
  content += "<th><label>Weight</label></th>";
  for(var i = 1; i <= factors; i++){
    content += "<td>";
    content += "<input type=\"number\" name=\"w"+i+"\" value=\"0.0\">";
    content += "</td>";
  }
  content += "</tr>";
  return content;
}
function generateTableCalc(){
  var content = "<tr id = \"add-row-above\">"
  content += "<td>"
  content += "<button  class = \"btn\" type = \"button\" onclick=\"addRow()\"><i class=\"add-row fa fa-plus-circle\"></i></button>"
  content += "</td>"
  for(var i = 1; i < factors; i++){
    content += "<td></td>"
  }
  content += "<td class=\"results\">"
  content += "<button class= \"btn btn-default btn-sm\">Reset</button>"
  content += "<button type=\"button\" class= \"btn btn-primary btn-sm\" onClick=\"calculate()\">Calculate</button>"
  content += "</tr>"
  return content;
}

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
  document.getElementById("resultTable").innerHTML = "";
  for(var i = 0; i < options; i++){
    document.getElementById("resultTable").innerHTML += "<tr><td>Option "+(i+1)+"</td>"+"<td>"+points[i]+"</td></tr>";
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
