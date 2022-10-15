import {useEffect, useState} from 'react'
import './Viewport.css'
import Right from "./Right/Right";
import Left from "./Left/Left";
import Main from "./Main/Main";

import GeoJSON1 from '../GeoJSON/SE_State_Management_Polygons_1.json'
import GeoJSON2 from '../GeoJSON/SE_State_Management_Polygons_2.json'

let PolygonObjects = [
    {...GeoJSON1},
    {...GeoJSON2}
]

function Viewport() {
    const [currentItem, setCurrentItem] = useState(0)

    function handleButton(e, index) {
        e.preventDefault();
        setCurrentItem(index)
    }

    useEffect(() => {
        console.log('Selected Item: ', currentItem);
        console.log('Selected Poly: ', JSON.stringify(PolygonObjects[currentItem]));
    }, [currentItem]);

    let listOfPolygons = () => {
        return PolygonObjects.map( (element, index) => {
            return <button className={"list-polygon-item"} key={index} onClick={e => handleButton(e, index)}>Object {index + 1}</button>
        } )
    }

    return (
        <div className="ViewPort">
            <h1>Vite + React</h1>
            <div className="Left">
                <Left/>
                <div className={"Selector"}>
                    {listOfPolygons()}
                </div>
            </div>
            <div className="Main">
                <Main geojson={PolygonObjects[currentItem]}/>
            </div>
            {/*<div className="Right">*/}
            {/*    <Right/>*/}
            {/*</div>*/}
        </div>
    )
}

export default Viewport
