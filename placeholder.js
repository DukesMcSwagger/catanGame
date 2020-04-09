

//settlementNode click
for (let i = 0; i < 54; i++)
{
    let square = document.getElementById("settlementNode" + i);

    square.addEventListener("click", function(){
        this.src = "images/playerPieces/red square.png";
        //console.log("you clicked: " + this);

    });
}

//roadNode click
for (let i = 0; i < 54; i++)
{
    let rectangle = document.getElementById("roadNode" + i);

    rectangle.addEventListener("click", function(){
        this.src = "images/playerPieces/blue line.png";
        //console.log("you clicked: " + this);

    });
}
