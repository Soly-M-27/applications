import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

/*Key to remember: When writing html tags within the App function in its default div, all html tags
including the ones like img MUST have a closing tag as such: <img></img>. If not, React will complain. */

const sayHello = () => console.log("Hello World!");
console.log("sayHello on log after declared");
sayHello();
console.log("sayHello after direct call outside of App");

function App() {
  sayHello();
  console.log("sayHello inside of App");
  return (
    <div className="App">
      <h1>Hello World!</h1> 
      
    </div>
  )
}

export default App
