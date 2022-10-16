import { useState } from 'react'
import './Viewport.css'

import PolygonViewer from "./PolygonViewer/PolygonViewer.jsx";

// Import JSON(s) from File.
// TODO: Do this programmatically, and/or a way to upload a JSON dump in-browser
import GeoJSON1 from '../GeoJSON/SE_State_Management_Polygons_1.json'
import GeoJSON2 from '../GeoJSON/SE_State_Management_Polygons_2.json'

// TODO: Switch these imports to specific modules instead of mega 'turf' package
import { intersect, union, area } from "@turf/turf";

function Viewport() {
    let [featureCollections, setFeatureCollections] = useState([
        { ...GeoJSON1 },
        { ...GeoJSON2 }
    ])
    let [currentFeatureCollection, setCurrentFeatureCollection] = useState(featureCollections[0])
    let [firstPolygonSelection, setFirstPolygonSelection] = useState([])
    let [secondPolygonSelection, setSecondPolygonSelection] = useState([])
    let [errorMsgPrompt, setErrorMsgPrompt] = useState('');
    let [errorSubMsgPrompt, setErrorSubMsgPrompt] = useState('');

    let clearError = () => {
        setErrorMsgPrompt('')
        setErrorSubMsgPrompt('')
    }

    let handleFeatureCollectionSelectButton = (e, index) => {
        e.preventDefault();
        clearError()
        setCurrentFeatureCollection(featureCollections[index])
    }

    let handlePolygonSelectButton = (e, collectionIndex, polygonIndex) => {
        e.preventDefault();
        clearError()
        if(firstPolygonSelection.length === 0) {
            setFirstPolygonSelection([collectionIndex, polygonIndex])
            setCurrentFeatureCollection(featureCollections[collectionIndex])
        }
        else if(secondPolygonSelection.length === 0 && collectionIndex === firstPolygonSelection[0] && polygonIndex !== firstPolygonSelection[1]) {
            setSecondPolygonSelection([collectionIndex, polygonIndex])
        } else {
            clearSelections()
            setCurrentFeatureCollection(featureCollections[collectionIndex])
        }
    };

    let clearSelections = () => {
        setFirstPolygonSelection([])
        setSecondPolygonSelection([])
    }

    let generateNewCollection = newPolygon => {
        let selectedFeatureCollection = featureCollections[firstPolygonSelection[0]]
        let removeValFromIndex = [firstPolygonSelection[1], secondPolygonSelection[1]];

        let indexSet = new Set(removeValFromIndex);

        let arrayWithValuesRemoved = selectedFeatureCollection.features.filter((value, i) => !indexSet.has(i));

        selectedFeatureCollection = {
            ...selectedFeatureCollection,
            features: [...arrayWithValuesRemoved, {
                ...newPolygon
            }]
        }

        let copyOfPolygonObjects = [...featureCollections];
        copyOfPolygonObjects[firstPolygonSelection[0]] = selectedFeatureCollection;
        setFeatureCollections(copyOfPolygonObjects)

        clearSelections()
        setCurrentFeatureCollection(selectedFeatureCollection)

    };

    let generatePolygonUnion = e => {
        e.preventDefault();
        clearError()
        let currentFeatureCollection = featureCollections[firstPolygonSelection[0]]
        try {
            let newPolygon = union(
                currentFeatureCollection.features[firstPolygonSelection[1]],
                currentFeatureCollection.features[secondPolygonSelection[1]]
            )
            if (newPolygon.geometry.coordinates.length !== 1) throw new Error('Union is not calculable')
            generateNewCollection(newPolygon)
        } catch (e) {
            let msg = 'There was a problem calculating the union.'
            let subMsg = 'Most likely the two polygons are not eligible for this operation.'
            console.error(msg, subMsg)
            setErrorMsgPrompt(msg)
            setErrorSubMsgPrompt(subMsg)

        }
    };

    let generatePolygonIntersection = e => {
        e.preventDefault();
        clearError()
        let currFeatureCollection = featureCollections[firstPolygonSelection[0]]
        try {
            let newPolygon = intersect(
                currFeatureCollection.features[firstPolygonSelection[1]],
                currFeatureCollection.features[secondPolygonSelection[1]])
            if (newPolygon.geometry.coordinates.length !== 1) throw new Error('Intersection is not calculable')
            generateNewCollection(newPolygon)
        } catch (e) {
            let msg = 'There was a problem calculating the intersection.'
            let subMsg = 'Most likely the two polygons are not eligible for this operation.'
            console.error(msg, subMsg)
            setErrorMsgPrompt(msg)
            setErrorSubMsgPrompt(subMsg)
        }
    };

    let calculatePolygonArea = (polygon) => {
        return area(polygon).toFixed(3)
    }

    let getPolygonButtonList = () => {
        return featureCollections.map( (element, index) => {
            return (
                <div key={index}>
                    <button
                        className={'button list-feature-collection'}
                        key={`${index}-main`}
                        onClick={e => handleFeatureCollectionSelectButton(e, index)}
                    >
                        Collection {index + 1}
                    </button>
                    {
                        element.features.map((polygon, pIndex) => {
                            let color = ''
                            if (firstPolygonSelection[0] === index && firstPolygonSelection[1] ===pIndex) color = 'button-blue'
                            if (secondPolygonSelection[0] === index && secondPolygonSelection[1] ===pIndex) color = 'button-green'
                            return <div key={pIndex}>
                                <button
                                    className={`button list-polygon-item ${color}`}
                                    key={`${pIndex}-main`}
                                    onClick={e => handlePolygonSelectButton(e, index, pIndex)}
                                >
                                    Polygon {pIndex + 1}
                                </button>
                            </div>
                        })
                    }
                </div>
            )
        })
    }

    let getStatisticsPanel = () => {
        let polygon1area = () => calculatePolygonArea(featureCollections[firstPolygonSelection[0]].features[firstPolygonSelection[1]])
        let polygon2area = () => calculatePolygonArea(featureCollections[secondPolygonSelection[0]].features[secondPolygonSelection[1]])
        let totalArea = () => (parseFloat(polygon1area()) + parseFloat(polygon2area())).toFixed(3)
        return (
            <h2>
                <div className={'margin-bottom'}>Current Collection: {(firstPolygonSelection[0] + 1)}</div>
                <div className={'margin-bottom'}>You have selected:</div>
                <div className={'text-black indent-20-px margin-bottom text-blue'}>Polygon: {(firstPolygonSelection[1] + 1)}</div>
                <div className={'indent-20-px margin-bottom-extra'}>Area: {polygon1area()}</div>
                <div className={'indent-20-px margin-bottom text-green'}>
                    {secondPolygonSelection.length ? `Polygon: ${(secondPolygonSelection[1] + 1)} ` : ''}
                </div>
                <div className={'indent-20-px margin-bottom-extra '}>
                    {secondPolygonSelection.length ? `Area: ${polygon2area()}` : ''}
                </div>
                <div className={'margin-bottom'}>{secondPolygonSelection.length ? `Total Area: ${totalArea()}` : ''}</div>
            </h2>
        )
    }

    let getErrorPrompt = () => {
        return (
            <div className={'error-dialog'}>
                <div className={'error-message'}>Error: {errorMsgPrompt}</div>
                <div className={'error-sub-message'}>{errorSubMsgPrompt}</div>
            </div>
        )
    }
    
    let getSelectionPanel = () => {
        if (firstPolygonSelection.length) {
            return (
                <div className={'statistics-info'}>
                    <div className={'button-group'}>
                        <button onClick={generatePolygonUnion}
                            className={'button button-side margin-right-sm'}
                            disabled={!secondPolygonSelection.length}
                        >
                            Calculate Union
                        </button>
                        <button onClick={generatePolygonIntersection}
                            className={'button button-side'}
                            disabled={!secondPolygonSelection.length}
                        >
                            Calculate Intersection
                        </button>
                    </div>
                    {errorMsgPrompt ? getErrorPrompt() : ''}
                    {getStatisticsPanel()}
                </div>
            )
        } else {
            return (<h2 className={"margin-top-0"}>Select a polygon to begin.</h2>)
        }
    }

    return (
        <div className="viewport-main">
            <div className="polygon-list-panel">
                { getPolygonButtonList() }
            </div>
            <div className="polygon-viewer-panel">
                <PolygonViewer geojson={currentFeatureCollection} firstPolygon={firstPolygonSelection} secondPolygon={secondPolygonSelection}/>
            </div>
            <div className="statistics-panel">
                { getSelectionPanel() }
            </div>
        </div>
    )
}

export default Viewport
