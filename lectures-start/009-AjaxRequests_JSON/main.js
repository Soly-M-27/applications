/* Ajax : Asynchronous JavaScript and XML 

XMLHttpRequest: 
    So basically you can send this tiny
    amount of data to a server asking for more data. 
    And that server can then send back, usually, a JSON object.
    The JavaScript can pass that data, turn it into JavaScript
    objects or JavaScript arrays and loop through the data
    in there to add more to your document object model, add
    more HTML to your page dynamically. And that is powerful
    and helps load data. It's super LIGHTWEIGHT. 
    
So, you can ignore XMLHttpRequest and use fetch() instead. */

/* The fetch API */

fetch('https://swapi.dev/api/people/1') //For fetch request, don't use ; to close them or .then will be undefined
    .then(response => response.json())
    .then(data => console.log(data)) //data is what hold the response from line 18. You can name this variable whatever you want really.