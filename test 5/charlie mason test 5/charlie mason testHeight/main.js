var myGamePiece;
var myObstacles = [];
var myScore;
var speedO;




function startGame() {
    myGameArea.start();
    myGamePiece = new component(40, 40, "green", 50, 120);
    myScore = new component("50px", "Consolas", "white", 1500, 40, "text");
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1900;
        this.canvas.height = 570;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
stop : function() {
    clearInterval(this.interval);
}
}
function everyinterval(n) {
    if (myGameArea.frameNo / n % 1 == 0) {return true;}
    return false
}



function component(width, height, color, x, y, type) {
    this.type = type;
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 6;    
    this.gravity = 0.3;
    this.gravitySpeed = 4;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
          } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
          }
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;     
        this.hitBottom();   
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
}


function updateGameArea () {
    var x, y;
    for(i = 0; i < myObstacles.length; i += 1){
    if (myGamePiece.crashWith(myObstacles[i])) {
        myGameArea.stop();
        return;
    }
}
  
    myGameArea.clear();
    myGameArea.frameNo += 2;

    if(myGameArea.frameNo == 4 || everyinterval(Math.floor((Math.random() * 50) + 100))){
        var oHeight = Math.floor(Math.random() * 90) + 20;
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - oHeight;
        myObstacles.push(new component(40, oHeight, "red", x, y ));
        console.log(myObstacles[myObstacles.length -1].height)
    }
    if(myGameArea.frameNo < 200){
        speedO = 5;
    }else if(myGameArea.frameNo >= 200 && myGameArea.frameNo < 300){
        speed0 = 6;
    }else if(myGameArea.frameNo >= 300 && myGameArea.frameNo < 500){
        speed0 = 7;
    }else if(myGameArea.frameNo >= 500 && myGameArea.frameNo < 700){
        speed0 = 8;
    }else if(myGameArea.frameNo >= 700 && myGameArea.frameNo < 900){
        speed0 = 9;
    }else if(myGameArea.frameNo >= 900 && myGameArea.frameNo < 1100){
        speed0 = 10;
    }else if(myGameArea.frameNo >= 1300 && myGameArea.frameNo < 1600){
        speed0 = 11;
    }else if(myGameArea.frameNo >= 1600 && myGameArea.frameNo < 1900){
        speed0 = 12;
    }else if(myGameArea.frameNo >= 1900 && myGameArea.frameNo < 2100){
        speed0 = 13;
    }else if(myGameArea.frameNo >= 2100 && myGameArea.frameNo < 2300){
        speed0 = 14;
    }else if(myGameArea.frameNo >= 2300 && myGameArea.frameNo < 10000){
        speed0 = 15;
    }
    // loop
    for (i = 0; i < myObstacles.length; i += 1) { 
        myObstacles[i].x -= speedO;
        if(myObstacles[i].x + 40 < 0){
            myObstacles.splice(i, 1);
        }else{
            myObstacles[i].update();

        }
        
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    
    
    if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -10; }
    
    myGamePiece.newPos();    
    myGamePiece.update();
}
function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

