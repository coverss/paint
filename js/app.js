var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var color = "black";
var canvas = $("canvas");
var context = canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img,0,0,500,400);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}


canvas.mousedown(function(e){
  lastEvent = e;
   mouseDown = true;
}).mousemove(function(e){
 
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  canvas.mouseup();
});

function clearCanvas()
{
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
};

$('#clearCanvas').click(function(e){
    clearCanvas();
});


function grayscale (){
    var currImgData = context.getImageData(0, 0, 500, 400);
       
        for (var i = 0; i < currImgData.data.length; i += 4) {
          var r = currImgData.data[i];
          var g = currImgData.data[i + 1];
          var b = currImgData.data[i + 2];
          var v = 0.2126*r + 0.7152*g + 0.0722*b;
          currImgData.data[i] = v;
          currImgData.data[i + 1] = v;
          currImgData.data[i + 2] = v;
        }
        context.putImageData(currImgData, 0, 0);
}


function original(weights){
  var currImgData = context.getImageData(0, 0, 500, 400);
   
        for (var i = 0; i < currImgData.data.length; i += 4) {
          
          currImgData.data[i]     += weights[i % 8]; 
          currImgData.data[i + 1] += weights[i % 8]; 
          currImgData.data[i + 2] += weights[i % 8]; 

        }
       
        context.putImageData(currImgData, 0, 0);
}
function violet(weights){
  var currImgData = context.getImageData(0, 0, 500, 400);
       
        for (var i = 4; i < currImgData.data.length - 4; i += 4) {

          currImgData.data[i]     = (currImgData.data[i-1] + currImgData.data[i] + currImgData.data[i+1])/3; // red
          currImgData.data[i + 1] = (currImgData.data[i] + currImgData.data[i+1] + currImgData.data[i+2])/3; // green
          currImgData.data[i + 2] = (currImgData.data[i] + currImgData.data[i+2] + currImgData.data[i+3])/3;
        }
        
        context.putImageData(currImgData, 0, 0);
}

function blur(weights){ 
var currImgData = context.getImageData(0, 0, 500, 400); 

for (var i = 0; i < currImgData.data.length-40; i += 4) { 
var x = currImgData.data[i]; 
var y = currImgData.data[i+1]; 
var z = currImgData.data[i+2]; 

for(var j = 0; j < 10; j++){ 
x += currImgData.data[i+j*4]; 
y += currImgData.data[i+1+j*4]; 
z += currImgData.data[i+2+j*4]; 
} 
currImgData.data[i] = x/10; 
currImgData.data[i + 1] = y/10; 
currImgData.data[i + 2] = z/10; 
} 
context.putImageData(currImgData, 0, 0); 
}


function sepia(){
  var currImgData = context.getImageData(0, 0, 500, 400);
        
        for (var i = 0; i < currImgData.data.length; i += 4) {
          var r = currImgData.data[i];
          var g = currImgData.data[i + 1];
          var b = currImgData.data[i + 2];
          currImgData.data[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
          currImgData.data[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
          currImgData.data[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue

        }
     
        context.putImageData(currImgData, 0, 0);
}

function brightness(){
  var currImgData = context.getImageData(0, 0, 500, 400);
        
        var bright_lvl = 50;
        for (var i = 0; i < currImgData.data.length; i += 4) {
          currImgData.data[i] += bright_lvl;
          currImgData.data[i + 1] += bright_lvl;
          currImgData.data[i + 2] += bright_lvl;
        }
        
        
        context.putImageData(currImgData, 0, 0);
}
function treshold(){
  var currImgData = context.getImageData(0, 0, 500, 400);
        
        var bright_lvl = 50;
        for (var i = 0; i < currImgData.data.length; i += 4) {
          var r = currImgData.data[i];
          var g = currImgData.data[i + 1];
          var b = currImgData.data[i + 2];
          var v = (0.2126*r + 0.7152*g + 0.0722*b >= 100) ? 255 : 0;
          currImgData.data[i]     = v; 
          currImgData.data[i + 1] = v; 
          currImgData.data[i + 2] = v; 
        }
        
        context.putImageData(currImgData, 0, 0);
}
function inverse(){
  var currImgData = context.getImageData(0, 0, 500, 400);
        
        for (var i = 0; i < currImgData.data.length; i += 4) {
          
          currImgData.data[i]     = 255 - currImgData.data[i]; 
          currImgData.data[i + 1] = 255 - currImgData.data[i+1] ; 
          currImgData.data[i + 2] = 255 - currImgData.data[i+2]; ; 
        }
        context.putImageData(currImgData, 0, 0);
}


$(document).ready(function(){
    $("#img-file").on('change', handleImage);
  $("#backward").click(function(){
      p = context.getImageData(0, 0, canvas.width, canvas.height);
      context.clearRect(0, 0, canvas.width, canvas.height);
      $("#forward").click(function(){
          context.putImageData(p, 0, 0);
      });
    });

$('#grayscale').click(function(){
      grayscale();
    });
  $('#blur').click(function(){
      blur();
    });
  $('#sepia').click(function(){
    sepia();
    });
  $('#brightness').click(function(){
    brightness();
    });
  $('#treshold').click(function(){
    treshold();
    });
  $('#sharpen').click(function(){
    original(
      [  0, -20,  0,
        -20,  70, -20,
         0, -20,  0 ]);
    });
  $('#sobel').click(function(){
    
    original(
      [-20, 50, 20,
       -40, 50, 40,
       -20, 50, 20 ]);
    original(
      [-20, -40, -20,
         50, 50, 50,
        20, 40, 20 ]);
    });
  $('#blur').click(function(){
    blur();
    });
  $('#inverse').click(function(){
    inverse();
    });
  $('#violet').click(function(){
    violet();
    });

});


