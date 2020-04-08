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
    getDiceTotal(diceTotal);
}
//const btn = document.querySelector('#btn');
//btn.addEventListener('click', rollDice(), false);

// function createEventListeners(){
//     document.getElementById("btn").addEventListener("click", rollDice, false);
// }

// window.addEventListener("load", createEventListeners, false);