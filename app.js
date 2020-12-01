
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src="images/bird.png";
bg.src = "images/bg.png";
fg.src= "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src= "images/pipeSouth.png";

var fly = new Audio();
var die = new Audio();
var hit = new Audio();
var point = new Audio();

fly.src = "audios/fly.wav";
die.src = "audios/die.wav";
hit.src = "audios/hit.wav";
point.src = "audios/point.wav";

var gap=75;
var constant = pipeNorth.height + gap;
var bX = 10;
var bY =150;
var gravity = 1.5;
var score =0;


document.addEventListener("keydown",moveUp);
function moveUp()
{
    bY -= 20;
    fly.play();
}
var pipe = [];

pipe[0] = {
    x: cvs.width ,
    y : 0
}


function draw()
{
    
   ctx.drawImage(bg,0,0);
   ctx.drawImage(bg,288,0);
    

    for(let i=0;i<pipe.length;i++ )
    {
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;
        if(pipe[i].x == 240){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }
        
        //detect collision
        if(bX + bird.width >= pipe[i].x && bX<= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height
             || bY + bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height-fg.height)
        {
            
            location.reload();
            
        }
        if(pipe[i].x == 5) 
        {
            score++; 
            point.play();
        }
        
    }
    
    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(fg,288,cvs.height-fg.height);
    ctx.drawImage(bird,bX,bY);
    ctx.fillStyle = "#000";
    ctx.font = "20px verdana";
    ctx.fillText("Score :" + score,10,20);
    bY += gravity;
    requestAnimationFrame(draw);
}

draw();




     


