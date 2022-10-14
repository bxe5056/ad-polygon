import { useState } from 'react'
import './App.css'
import MenuBar from "./MenuBar/MenuBar.jsx";
import Viewport from "./Viewport/Viewport.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="Main">
        <div>
            <MenuBar/>
        </div>
        <div>
            <Viewport/>
        </div>
    </div>
  )
}

export default App
