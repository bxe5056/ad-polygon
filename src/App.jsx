import MenuBar from "./MenuBar/MenuBar.jsx";
import Viewport from "./Viewport/Viewport.jsx";

function App() {
    return (
        <div className="polygon-viewer-panel">
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
