"use strict"; /*This forces all variables to have a data type, making debugging
easier and less prone not findind lose syntax errors*/

/* For variable scopes, var is the mosy freeing of them. It allows greeting, in this case, 
exist outside of the for loop, even after it completes. If you use const or let, it will not
work the same. The scope of var seems to be the most flexible so far. Remember. */
const num = 1234;

if (num === 1234) 
{
    var greeting = "Hello 1234";
}
console.log(greeting)


let person1 = "Solymar S.";
function greet() {
    console.log(`Hello ${person1}`); /* You need to write these ${} enclosed variables with backticks, 
    not single quotation marks*/
    /*var person2 = "Jhon"; /*This var will not work outside of the function*/
}
greet();
/*console.log(person2, "Is the second person");*/

let x = 1;
x = 2;
/*z = 9; /*z is not defines so use strict will kick into gear and help debug things easier*/