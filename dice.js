//Click roll dice button to generate random numbers
//Author: Bryant Barrios
//File Name: dice.js


function rollDice(){
    var die1= document.getElementById("die1");
    var die2= document.getElementById("die2");
    var status= document.getElementById("status");
    var d1= Math.floor(Math.random() * 6) + 1;
    var d2= Math.floor(Math.random() * 6) + 1;
    var diceTotal= d1 + d2; //who rolled the largest number
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    status.innerHTML = "You rolled a " + diceTotal + "."
}
//const btn = document.querySelector('#btn');
//btn.addEventListener('click', rollDice(), false);

function createEventListeners(){
    document.getElementById("btn").addEventListener("click", rollDice, false);
}

window.addEventListener("load", createEventListeners, false);