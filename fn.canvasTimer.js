$.canvasTimer = function( arg ){
  var condition = false;
  var usecb = false;
  var duration = 30000;
  if( $.isFunction(arg)) {
   usecb = true;     
  }else{
   if( toString.call(arg) == "[object Number]" ){
    duration = arg;
   }
  }
  setTimeout(function(){
   condition = true;
  },duration);
    
  var canvas = $("<canvas>");
  $("body").append(canvas);
    
  var ctx = canvas[0].getContext("2d");
  var x = y = 1;//parseInt(Math.sqrt(duration/10),10)+1;
  var win = $(window);
    
  x = win.width()*0.4;
  y = win.height()*0.4;

  canvas.css({
      position: 'fixed',
      zIndex: '99999',
      border: '3px outset #cecece',
      width: x+'px',
      height: y+'px',
      top: (win.height()/2)-(y/2)+"px",
      left: (win.width()/2)-(x/2)+"px",
      borderRadius: '100px'
  })
    
  canvas.attr('width', x+'px');
  canvas.attr('height', y+'px');
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, x, y);

  var rotateOpts = ['X','Y','Z'];
  var rotateStyle = 0;
  var pixelCount = -1;
  !function pixelDown(){
    if(pixelCount++ > x*y/36){
        pixelCount = -1;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, x, y);
        rotateStyle++;
    }
    var dx = (pixelCount % x);
    var dy = parseInt(pixelCount/x,10)*40;
    var cr, cg, cb;
    cr = (Math.random()*256|0).toString(16);
    cg = (Math.random()*256|0).toString(16);
    cb = (Math.random()*256|0).toString(16);
    setTimeout(function(){
        if( condition || (usecb && arg())){
            canvas.fadeOut();
            return;            
        }
        canvas.css('transform','rotate'+rotateOpts[rotateStyle%3]+'('+pixelCount%360+'deg');
        ctx.fillStyle = "#"+cr+cg+cb;
        ctx.fillRect(dx, dy, 10, 50); 
        pixelDown();
    },10);
  }();
};

var condition = false;
$.canvasTimer(function(){ return condition; });
setTimeout(function(){ condition = true; },15000);
