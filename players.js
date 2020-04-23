//Variables used
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");	
var sheep1 = 0, sheep2 = 0, sheep3 = 0, sheep4 = 0;
var wood1 = 0, wood2 = 0, wood3 = 0, wood4 = 0;
var ore1 = 0, ore2 = 0, ore3 = 0, ore4 = 0;
var brick1 = 0, brick2 = 0, brick3 = 0, brick4 = 0;
var wheat1 = 0, wheat2 = 0, wheat3 = 0, wheat4 = 0;
var totalHand1 = 0, totalHand2 = 0, totalHand3 = 0, totalHand4 = 0;
var points1 = 0, points2 = 0, points3 = 0, points4 = 0;

var pointsToWin = 5;

//Player 1's information
function player1(){
    //rectangle outline
    ctx.beginPath();
    ctx.rect(58, 58, 154, 19);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    //Player color
    ctx.beginPath();
    ctx.rect(60, 60, 150, 15);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath(); 

    //Player 1 
    ctx.font = "20px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Player 1:", 63, 50);

    //resource and hand totals
    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Sheep: "+sheep1, 63, 100);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wood: "+wood1, 63, 120);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Ore: "+ore1, 63, 140);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Brick: "+brick1, 63, 160);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wheat: "+wheat1, 63, 180);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Points : "+ points1, 63, 200);
}

//Player 2's information
function player2(){
   //rectangle outline
   ctx.beginPath();
    ctx.rect(1718, 58, 154, 19);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    //Player color
    ctx.beginPath();
    ctx.rect(1720, 60, 150, 15);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath(); 

    //Player 1 
    ctx.font = "20px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Player 2:", 1723, 50);

    //resource and hand totals
    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Sheep: "+sheep2, 1723, 100);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wood: "+wood2, 1723, 120);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Ore: "+ore2, 1723, 140);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Brick: "+brick2, 1723, 160);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wheat: "+wheat2, 1723, 180);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Points : "+ points2, 1723, 200); 
}

//player 3's
function player3(){
    //rectangle outline
    ctx.beginPath();
    ctx.rect(58, 728, 154, 19);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    //Player color
    ctx.beginPath();
    ctx.rect(60, 730, 150, 15);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    //Player 1 
    ctx.font = "20px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Player 3:", 63, 720);

    //resource and hand totals
    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Sheep: "+sheep3, 63, 770);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wood: "+wood3, 63, 790);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Ore: "+ore3, 63, 810);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Brick: "+brick3, 63, 830);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wheat: "+wheat3, 63, 850);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Points : "+ points3, 63, 870);
}

//Player 4's infromation

function player4(){
   //rectangle outline
   ctx.beginPath();
    ctx.rect(1718, 728, 154, 19);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    //Player color
    ctx.beginPath();
    ctx.rect(1720, 730, 150, 15);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath(); 

    //Player 1 
    ctx.font = "20px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Player 4:", 1723, 720);

    //resource and hand totals
    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Sheep: "+sheep4, 1723, 770);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wood: "+wood4, 1723, 790);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Ore: "+ore4, 1723, 810);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Brick: "+brick4, 1723, 830);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Wheat: "+wheat4, 1723, 850);

    ctx.font = "16px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Points : "+ points4, 1723, 870); 
}

//drawPlayer UI
function updatePlayers()
{
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    player1();
    player2();
    player3();
    player4();

    if (points1 >= pointsToWin)
    {
        window.alert("Player 1 Wins!");
    }
    else if (points1 >= pointsToWin)
    {
        window.alert("Player 2 Wins!");
    }
    else if (points1 >= pointsToWin)
    {
        window.alert("Player 3 Wins!");
    }
    else if (points1 >= pointsToWin)
    {
        window.alert("Player 4 Wins!");
    }
}

updatePlayers()