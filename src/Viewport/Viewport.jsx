import {useEffect, useState} from 'react'
import './Viewport.css'
import Main from "./Main/Main";

import GeoJSON1 from '../GeoJSON/SE_State_Management_Polygons_1.json'
import GeoJSON2 from '../GeoJSON/SE_State_Management_Polygons_2.json'
import {union} from "@turf/turf";



function Viewport() {
    let [polygonObjects, setPolygonObjects] = useState([
        {...GeoJSON1},
        {...GeoJSON2}
    ])



    const [currentItem, setCurrentItem] = useState(0)
    const [currentObject, setCurrentObject] = useState(polygonObjects[0])
    const [firstSelection, setFirstSelection] = useState([])
    const [secondSelection, setSecondSelection] = useState([])

    function handleFeatureCollectionButton(e, index) {
        e.preventDefault();
        setCurrentItem(index)
        setCurrentObject(polygonObjects[index])
    }

    function handlePolygonButton(e, index, pIndex) {
        e.preventDefault();
        if(firstSelection.length === 0) {
            setFirstSelection([index, pIndex])
            setCurrentItem(index)
            setCurrentObject(polygonObjects[index])
        }
        else if(secondSelection.length === 0 && index === firstSelection[0]) {
            setSecondSelection([index, pIndex])
        } else {
            setFirstSelection([])
            setSecondSelection([])
            setCurrentItem(index)
            setCurrentObject(polygonObjects[index])

        }
        console.log("Item: ", JSON.stringify(polygonObjects[index].features[pIndex]))
    }

    function handleUnion(e) {
        e.preventDefault();
        let currFeatureCollection = polygonObjects[firstSelection[0]]
        let theUnion = union(
            currFeatureCollection.features[firstSelection[1]],
            currFeatureCollection.features[secondSelection[1]])
        console.log("UNION: ", JSON.stringify(theUnion))



        const removeValFromIndex = [firstSelection[1], secondSelection[1]];

        const indexSet = new Set(removeValFromIndex);

        const arrayWithValuesRemoved = currFeatureCollection.features.filter((value, i) => !indexSet.has(i));

        currFeatureCollection = {
            ...currFeatureCollection,
            features: [...arrayWithValuesRemoved, {
                ...theUnion
            }]
        }

        let t = [...polygonObjects];
        t[firstSelection[0]] = currFeatureCollection;
        setPolygonObjects(t)

        setCurrentObject(currFeatureCollection)


        console.log(JSON.stringify(polygonObjects[firstSelection[0]]))
        console.log(JSON.stringify(currFeatureCollection))

    }

    let listOfPolygons = () => {
        return polygonObjects.map( (element, index) => {
            return <div key={index}>
                <button className={"list-feature-collection"} key={`${index}-main`} onClick={e => handleFeatureCollectionButton(e, index)}>Collection {index + 1}</button>
                {
                    element.features.map((polygon, pIndex) => {
                        return <div key={pIndex}>
                            <button className={"list-polygon-item"} key={`${pIndex}-main`} onClick={e => handlePolygonButton(e, index, pIndex)} >Polygon {pIndex + 1}</button>
                        </div>
                    })

                }
            </div>

        } )
    }

    return (
        <div className="ViewPort">
            <h1>Polygon Calculation Machine</h1>
            <div className="Left">
                <div className={"Selector"}>
                    {listOfPolygons()}
                </div>
            </div>
            <div className="Main">
                <Main geojson={currentObject}/>
            </div>
            <div className="Right">
                <h2 className={"Selector2"}>
                    {firstSelection.length ? `In Collection: ${(firstSelection[0] + 1)}` : ''}
                    <br/>
                    {firstSelection.length ? `You have selected: ` : ''}
                    <br/>
                    {firstSelection.length ? `Polygon: ${(firstSelection[1] + 1)} ` : ''}
                    <br/>
                    {secondSelection.length ? `Polygon: ${(secondSelection[1] + 1)} ` : ''}

                    <button onClick={handleUnion}/>
                </h2>
            </div>
        </div>
    )
}

export default Viewport
