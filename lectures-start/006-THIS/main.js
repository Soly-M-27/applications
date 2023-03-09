/* this keyword and all its importance in JavaScript */

/*const person5 = {
    'name': 'Kalob',
    speak(name) {
        console.log(`My name is ${name}`);
    }
}

person5.speak(); //undefined
person5.speak("Zephyr");

const person6 = {
    'name': 'Jason',
    speak() {
        console.log(`My name is ${person6['name']}`);
        console.log(`With the this keyword, I can also reach the current objects name: ${this.name}`);
    }
}

person6.speak();*/

/* This keyword with functions */

function counter() {
    if (this.total === undefined) {
        this.total = 1
    }
    else {
        this.total++;
    }
    console.log("Running counter. Total is", this.total);
}

counter();
counter();
counter();
counter();
counter();
counter();
counter();
counter();
counter();