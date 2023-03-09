"use strict";
/* Destructuring arrays and objects */

/*const months = ['January','February','December'];
const [jan, feb] = months;
console.log([jan, feb]);
console.log(months);*/



/* To set up Dates */

/* let d = new Date(2025, 0, 15) /* Index of the months starts from 0 to 11 instead of 1 - 12 */
/* console.log(d.getFullYear())
console.log(d.getDate())
console.log(d.getMonth())
console.log(d) */
/* There are many options, getters and setters for date variables. Check later with caution. */



/* Object variable example similar to destructuring an array and objects */

/*const person3 = {
    "name": "Kalob",
    "instagram": "@coding.for.everybody",
    "somethingelse": "something else"
}

if(person3) {
    const {name, instagram} = person3;
    console.log("This is only the name and insta of person3");
    console.log({name, instagram});
}
console.log("This is person3's complete info:")
console.log(person3);*/

/* Deleting Object properties */

/*const person4 = {
    'name': 'Kalob',
    'age': 31
}

console.log("Full info on person4:");
console.log(person4);

delete person4['age'];
console.log("Age: ? " + person4['age']);

console.log("Current info on person4: ");
console.log(person4);*/

/*delete person4; This will not work, especially with 'use strict'
SyntaxError: Delete of an unqualified identifier in strict mode.*/

/*delete person4;*/
/*console.log("Current info after deletion: ");
console.log(person4);*/



/* Random number game with a while loop */

/*while(true) 
{
    const prompt = require("prompt-sync")({sigint:true}); //This was done to be able to see the prompt on the server side and not force testing on web browsers
    let num = prompt("Please enter a number: ");
    num = Number(num);
    const ran_num = Math.ceil(Math.random() * 10);
    if (num == ran_num)
    {
        console.log("You guessed the right number! Congrats!");
        break;
    }
    else {
        console.log("You guessed ", num, ". But the right number was ", ran_num);
    }
}*/



/* */

