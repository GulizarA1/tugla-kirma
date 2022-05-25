const game=document.querySelector(".game");
const racket=document.createElement("div");
racket.classList.add("racket");
game.appendChild(racket);
const ball=document.createElement("div");

game.appendChild(ball);

let bounce=new Audio("./sounds/")
let barhit=new Audio();
let lose=new Audio();
let velocity= 1.1
let brickcount=10*5
let barvelocity=15.90
let up=true
let right
let getboundingclient
let leftright=Math.floor(Math.random()*2);
leftright?(right=true):(right=false);

const bricks= ()=>{
    let left=1
    let top=1
    for (let i=1;i<brickcount;i++)
    {
        let brick=document.createElement("div")
        brick.classList.add("bricks")
        brick.style.left=10+left+"px"
        brick.style.top=30+top+"px"
        let backcolour=""
        for(let a=1;a<5;a++)
        {
            let number=Math.floor(Math.random()*10+1)
            backcolour+=number
        }
        brick.style.background="a"+backcolour+"fa"
        game.appendChild(brick)
        left=left+42
        if(i%10==0){
            left =1;
            top=top +30;
        }
        

    }
}

let ballwidth=parseInt(window.getComputedStyle(ball).getPropertyValue("width"));
let balltop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
let ballbottom =parseInt(window.getComputedStyle(ball).getPropertyValue("buttom"));
let ballright = parseInt(window.getComputedStyle(ball).getPropertyValue("right"));
let ballleft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));


let barrwidth=parseInt(window.getComputedStyle(racket).getPropertyValue("width"));
let bartop = parseInt(window.getComputedStyle(racket).getPropertyValue("top"));
let barbottom =parseInt(window.getComputedStyle(racket).getPropertyValue("buttom"));
let barright = parseInt(window.getComputedStyle(racket).getPropertyValue("right"));
let barleft = parseInt(window.getComputedStyle(racket).getPropertyValue("left"));


let boardwidth=parseInt(window.getComputedStyle(game).getPropertyValue("width"));
let boardheight=parseInt(window.getComputedStyle(game).getPropertyValue("height"));
let boardtop = parseInt(window.getComputedStyle(game).getPropertyValue("top"));
let boardbottom =parseInt(window.getComputedStyle(game).getPropertyValue("buttom"));
let boardright = parseInt(window.getComputedStyle(game).getPropertyValue("right"));
let boardleft = parseInt(window.getComputedStyle(game).getPropertyValue("left"));


let brick=document.querySelectorAll(".game.bricks")
let startgame=()=>{
    ball.classList.add("ball");
    bricks();
    brick = document.querySelectorAll(".game.bricks");
    let basla=setInterval(()=>{

        let ballwidth=parseInt(window.getComputedStyle(ball).getPropertyValue("width"));
 balltop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
 ballbottom =parseInt(window.getComputedStyle(ball).getPropertyValue("buttom"));
 ballright = parseInt(window.getComputedStyle(ball).getPropertyValue("right"));
 ballleft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));


 barrwidth=parseInt(window.getComputedStyle(racket).getPropertyValue("width"));
 bartop = parseInt(window.getComputedStyle(racket).getPropertyValue("top"));
 barbottom =parseInt(window.getComputedStyle(racket).getPropertyValue("buttom"));
 barright = parseInt(window.getComputedStyle(racket).getPropertyValue("right"));
 barleft = parseInt(window.getComputedStyle(racket).getPropertyValue("left"));


 boardwidth=parseInt(window.getComputedStyle(game).getPropertyValue("width"));
 boardheight=parseInt(window.getComputedStyle(game).getPropertyValue("height"));
 boardtop = parseInt(window.getComputedStyle(game).getPropertyValue("top"));
 boardbottom =parseInt(window.getComputedStyle(game).getPropertyValue("buttom"));
 boardright = parseInt(window.getComputedStyle(game).getPropertyValue("right"));
 boardleft = parseInt(window.getComputedStyle(game).getPropertyValue("left"));

 if (right && up)
 {
     ball.style.left=ballleft+1*velocity+"px";
     ball.style.top=balltop-1*velocity+"px";
 }
 
 if (!right && up)
 {
     ball.style.left=ballleft-1*velocity+"px";
     ball.style.top=balltop-1*velocity+"px";
 }

 if (right && !up)
{
    ball.style.left=ballleft+1*velocity+"px";
    ball.style.top=balltop+1*velocity+"px";
}

if (!right && !up)
{
    ball.style.left=ballleft-1*velocity+"px";
    ball.style.top=balltop+1*velocity+"px";
}

//boardcontrol
if (ballleft<0+ballwidth/2)
{
    right=true;
    bounce.play();
    bounce.currentTime=0;
}

if(ballleft>=boardwidth-ballwidth/2)
{
    right=false;
    bounce.play();
    bounce.currentTime=0;
}

if(balltop<0)
{
    up=false;
    leftright=Math.floor(Math.random()*2);
    leftright?(right=true):(right=false);
    bounce.play();
    bounce.currentTime=0;
}

if(balltop>boardheight-ballwidth)
{
    lose.play();
    lose.currentTime=0;
    setTimeout(() => {
        initial()
    }, 600)
    clearInterval(basla)
}

if(balltop>bartop-ballwidth && ballleft+barwidth/2>barleft &&
ballright>barright)
{
    up=true
    leftright=Math.floor(Math.random()*2);
    leftright?(right=true):(right=false);
    barhit.play();
    barhit.currentTime=0;
}
brickcollition();


    },1);
};
let boardbounds= game.getBoundingClientRect();
window.addEventListener("keydown",(e)=>{

if (e.key==="ArrowRight" && 
barleft+barwidth/2+barvelocity<boardwidth)
{
    racket.style.left=barleft+1*barvelocity+"px"
}    
else if (e.key==="ArrowLeft" && 
barleft>boardbounds.width/6)
{
    racket.style.left=barleft-1*barvelocity+"px"
}    



})

const initial=()=>{
    let brick=document.querySelectorAll(".game.bricks")
    brick.forEach(item=>item.remove())
    ball.style.left="50%"
    ball.style.top="93%"
    racket.style.left="50%"
    setTimeout(()=>{
        startgame()

    },600)

}

const brickcollition=()=>{
    brick=document.querySelectorAll(".game.bricks")
    for(var i=0;i<brick.length;i++)
    {
        let brickbounds=brick[i].getBoundingClientRect()
        let ballbounds=ball.getBoundingClientRect()
        if(ballbounds.top<=brickbounds.bottom && 
            ballbounds.left>=brickbounds.left &&
            ballbounds.right<=brickbounds.right)
        {
            game.removeChild(brick[i])
            up=false
            leftright=Math.floor(Math.random()*2);
            leftright?(right=true):(right=false);
            barhit.play();
            barhit.currentTime=0;
        }    


    }
    if(brick.length===0)
    {
        setTimeout(()=>{
            velocity=velocity+1.1;
            initial();
        },600);
        clearInterval(basla);
    }
};

startgame();
