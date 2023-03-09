/* Arrow Functions */

const hello = () => {
    console.log("Hello!");
}
console.log("From the function hello: ");
hello(); //This is the only one that works without it being assigned to a variable


const heya = () => "Hey there!";
heya(); //const variable cannot be called like the above example because it still requires a console.log
console.log("From console: ", heya());


const h = () => console.log("HHHHHHHH!");
h(); //const h will execute console.log from within and if called again such as this very example
console.log("From console: ", h()); //undefined due to reasons beyond my scope but console.log within a console.log?


const myNewGreeting = (name) => { //You can always add more than one parameter
    console.log(`Welcome, ${name}!`);
}
myNewGreeting("Soly");

const NewGreeting = (name) => console.log(`Welcome, ${name}!`); //You can also add the return value directly without using curly braces
NewGreeting("Solymar");

/* Other forms of function assignment */

function hi() {
    return "Hello Soly!"
}
hi(); //This holds the returned value. Must place it within console.log or a variable that has to be logged as well
const greet = hi();
console.log("From console with const greet: ", greet);
console.log("From console with const greet without using it: ", hi());


const hey = function() { //assignment of anonymous function to const hey
    return "Hey!";
}
hey(); //Holds returned value like the example above. Does not display
const greeting = hey();
console.log("From console with const greeting: ", greeting);

/* Final examples derived from tested function designs */

/* The older syntax for coding functions. 
Reminder: the this keyword can be used within these normally/old-fashioned
written function and it references the object parameter. this will not work
the same in an arrow function type for it accesses the parameter from a global
scope. */

function myName(name) {
    ...
}

const anonymousFunction = function(name, secondParameter) {
    ...
} 

/* Newer ways to make arrow functions */

/* What are arrow functions?

    They are similar to a normal function but don't hold the "this"
    keyword relating to itself within the object, it would instead access
    something globally.
*/

const arrowFucn1 = (name) => {
    ...
    ...
    this
}


const arrowFunc2 = (name, secondParameter, etc) => {
    ...
    ...
    ...
}


const arrowFunc3 = (name) => ... //return value or console.log
