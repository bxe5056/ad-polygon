import { useState } from 'react'
import './Left.css'
import Main from "../Main/Main.jsx";
import Right from "../Right/Right.jsx";

function Left() {
    const [count, setCount] = useState(0)

    return (
        <div className="Left">
            <div className={"Selector"}>

            </div>
        </div>
    )
}

export default Left
