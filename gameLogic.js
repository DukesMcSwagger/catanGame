//Click roll dice button to generate random numbers
//Author: Bryant Barrios
//updated by: Eric Deering 20200407
//File Name: dice.js

function rollDice(){
    let die1= document.getElementById("die1");
    let die2= document.getElementById("die2");
    let status= document.getElementById("status");
    let d1= Math.floor(Math.random() * 6) + 1;
    let d2= Math.floor(Math.random() * 6) + 1;
    let diceTotal= d1 + d2; //who rolled the largest number
    status.innerHTML = "You rolled a " + diceTotal + "."
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    distributeResources(diceTotal);
}

function distributeResources(_roll)
{
    for (let i = 0; i < 19; i++)
    {
        if (_roll == tiles[i].tokenNumber)
        {
            console.log("giving " + tiles[i].resource + " to settlement nodes: ")
            for (let j = 0; j < tiles[i].settlementNodes.length; j++)
            {
                console.log(tiles[i].settlementNodes[j]);
            }
        }
    }
}
