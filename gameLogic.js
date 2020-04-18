//Click roll dice button to generate random numbers
//Author: Bryant Barrios
//updated by: Eric Deering 20200407, 20200409
//File Name: dice.js

//best way to find settlement nodes its to parse the tiles array and check those settlement nodes and
//look at the number and owner fields

//global variables
var firstTurnCount = 0
var settlementPlaced = false;
var roadPlaced = false;

function catanPlayer()
{
    this.player = 1;
    this.settlementPicture = "nothing";
    this.roadPicture = "nothing";
}

var activePlayer = new catanPlayer();


function rollDice(){
    let die1= document.getElementById("die1");
    let die2= document.getElementById("die2");
    let status= document.getElementById("status");
    let d1= Math.floor(Math.random() * 6) + 1;
    let d2= Math.floor(Math.random() * 6) + 1;
    let diceTotal= d1 + d2; //who rolled the largest number
    document.getElementById("btn").disabled = true;
    status.innerHTML = "You rolled a " + diceTotal + "."
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    distributeResources(diceTotal);
}

function distributeResources(_roll)
{
    let resource = "nothing";

    for (let i = 0; i < 19; i++)
    {
        if (_roll == tiles[i].tokenNumber) //figure out which tile is associated with the number rolled
        {
            resource = tiles[i].resource; //get that tiles resource
            for (let j = 0; j < tiles[i].settlementNodes.length; j++) //check all settlement nodes attached to that tile
            {
                if (tiles[i].settlementNodes[j].owner != 0) //check to make sure someone owns this settlement node.
                {
                    setResource(resource, tiles[i].settlementNodes[j].owner);
                }
            }
        }

        updatePlayers();
    }

    //logic for distributing the correct resource to the correct player
    function setResource(_resource, _owner)
    {
        if (_resource == "ore")
        {
            if (_owner == 1)
            {
                ore1 += 1
            }
            if (_owner == 2)
            {
                ore2 += 1
            }
            if (_owner == 3)
            {
                ore3 += 1
            }
            if (_owner == 4)
            {
                ore4 += 1
            }
        }
        if (_resource == "sheep")
        {
            if (_owner == 1)
            {
                sheep1 += 1
            }
            if (_owner == 2)
            {
                sheep2 += 1
            }
            if (_owner == 3)
            {
                sheep3 += 1
            }
            if (_owner == 4)
            {
                sheep4 += 1
            }
        }
        if (_resource == "wood")
        {
            if (_owner == 1)
            {
                wood1 += 1
            }
            if (_owner == 2)
            {
                wood2 += 1
            }
            if (_owner == 3)
            {
                wood3 += 1
            }
            if (_owner == 4)
            {
                wood4 += 1
            }
        }
        if (_resource == "brick")
        {
            if (_owner == 1)
            {
                brick1 += 1
            }
            if (_owner == 2)
            {
                brick2 += 1
            }
            if (_owner == 3)
            {
                brick3 += 1
            }
            if (_owner == 4)
            {
                brick4 += 1
            }
        }
        if (_resource == "wheat")
        {
            if (_owner == 1)
            {
                wheat1 += 1
            }
            if (_owner == 2)
            {
                wheat2 += 1
            }
            if (_owner == 3)
            {
                wheat3 += 1
            }
            if (_owner == 4)
            {
                wheat4 += 1
            }
        }
    }
}

//logic for controlling a players turn
function playerTurn(_player)
{
    console.log("it is player " + _player + "'s turn");
    document.getElementById("btn").disabled = false;

    //change the image to match the player that is placing settlements
    if (_player == 1)
    {
        activePlayer.settlementPicture = "redTriangle";
        activePlayer.roadPicture = "redLine";
        document.getElementById("playerTurn").innerHTML = "Current Turn: Player 1";
    }
    else if (_player == 2)
    {
        activePlayer.settlementPicture = "orangeTriangle";
        activePlayer.roadPicture = "orangeLine";
        document.getElementById("playerTurn").innerHTML = "Current Turn: Player 2";
    }
    else if (_player == 3)
    {
        activePlayer.settlementPicture = "blueTriangle";
        activePlayer.roadPicture = "blueLine";
        document.getElementById("playerTurn").innerHTML = "Current Turn: Player 3";
    }
    else if (_player == 4)
    {
        activePlayer.settlementPicture = "whiteTriangle";
        activePlayer.roadPicture = "whiteLine";
        document.getElementById("playerTurn").innerHTML = "Current Turn: Player 4";
    }
    else
    {
        console.log("playerTurn() Error: could not find player: " + _player);
    }
}

function endTurn()
{
    //make it the next players turn
    activePlayer.player += 1;

    if (activePlayer.player >= 5)
    {
        activePlayer.player = 1;
    }

    //call the next turn
    playerTurn(activePlayer.player);
}

function addTurnEventListeners()
{
    //settlementNode click
    for (let i = 0; i < 54; i++)
    {
        let square = document.getElementById("settlementNode" + i);

        square.addEventListener("click", function()
        {
            let settlementId = this.id.split("settlementNode").pop(); //get the settlement node number of the node that was clicked
            for (let i = 0; i < 19; i++) //check all tiles
            {
                for (let j = 0; j < tiles[i].settlementNodes.length; j++) //check the settlement nodes of those tiles
                {
                    if (tiles[i].settlementNodes[j].number == settlementId && tiles[i].settlementNodes[j].owner == 0) //if the player clicked this settlement node
                    {
                        tiles[i].settlementNodes[j].owner = activePlayer.player; //set the owner of this settlement node to this player
                        this.src = "images/playerPieces/" + activePlayer.settlementPicture + ".png";
                    }
                }
            }
        });
    }

    //roadNode click
    for (let i = 0; i < 72; i++)
    {
        let rectangle = document.getElementById("roadNode" + i);
        rectangle.addEventListener("click", function()
        {
            let roadId = this.id.split("roadNode").pop(); //get the road node number of the node that was clicked
            for (let j = 0; j < roadNodes.length; j++) //for every road node
            {
                if (roadNodes[j].number == roadId && roadNodes[j].owner == 0) //if the player clicked this road node
                {
                    roadNodes[j].owner = activePlayer.player; //set the owner of this road node to this player
                    this.src = "images/playerPieces/" + activePlayer.roadPicture + ".png";
                }
            }
        });
    }
}

function firstTurn()
{
    let endTurnBtn = document.getElementById("endTurn");
    let dice = document.getElementById("dicePosition");
    
    for (let i = 0; i < 54; i++)
    {
        document.getElementById("settlementNode" + i).addEventListener("click", firstTurnLogic)
    }
    for (let i = 0; i < 72; i++)
    {
        document.getElementById("roadNode" + i).addEventListener("click", firstTurnLogic)
    }

    playerTurn(activePlayer.player);
    endTurnBtn.hidden = true;
    dice.hidden = true;
}

function firstTurnLogic()
{
    if (this.id.search("settlementNode") >= 0)
    {
        settlementPlaced = true;
    }
    if (this.id.search("roadNode") >= 0)
    {
        roadPlaced = true;
    }
    if (settlementPlaced == true && roadPlaced == true)
    {
        activePlayer.player += 1;
        if (activePlayer.player >= 5)
        {
            activePlayer.player = 1;
            playerTurn(activePlayer.player);
        }
        settlementPlaced = false;
        roadPlaced = false;
        playerTurn(activePlayer.player);
        firstTurnCount += 1;
    }
    if (firstTurnCount >= 8)
    {
        endFirstTurn();
    }
}

function endFirstTurn()
{
    let endTurnBtn = document.getElementById("endTurn");
    let dice = document.getElementById("dicePosition");

    for (let i = 0; i < 54; i++)
    {
        document.getElementById("settlementNode" + i).removeEventListener("click", firstTurnLogic);
    }

    endTurnBtn.hidden = false;
    dice.hidden = false;
}

addTurnEventListeners();

firstTurn();





