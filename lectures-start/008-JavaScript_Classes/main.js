/* Classes */

class MyClassName {
    setName(name) {
        this.name = name;
    }
    speak() {
        if (this.name === undefined) {
            this.name = "Unamed Puppers"
        }
        console.log(`woof woof says the dog named ${this.name}`);
    }
}

const thing = new MyClassName()
thing.setName("Carlos"); //Set name first or name will be undefined
thing.speak();

/* Setting automatic defaults */
class Person {
    constructor(name) { 
        /* With the constructor you can retrieve any data type and with 
        the this keyword you can shortcut parameters through the Class 
        objects functions without adding said parameter on every single
        function within the Class*/
        this.name = name;
    }

    greeting() {
        console.log(`Hello from ${this.name}`);
    }
    setName(name) {
        this.name = name
    }
}
const kalob = new Person("Kalob");
kalob.greeting();
kalob.setName("Gully");
kalob.greeting();

/* JSON JavaScript Object Notation : Globally recognized way to write code and/or share data */

/* Example of a JSON file */
/*{
    'name': 'Soly',
    'favFoods': ['Pizza', 'Tacos', 'Salmon'],
    'age': 31,
    'children': [
        {
            'name': 'Zephyr',
            'age': 4,
        },
        {
            'name': 'Skully',
            'age': 5
        }
    ]
}*/


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