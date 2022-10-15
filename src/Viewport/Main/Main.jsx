import React, {useEffect, useRef, useState} from 'react'
import './Main.css'
import 'leaflet/dist/leaflet.css'
import { lineString, bbox } from "@turf/turf";
import {MapContainer, Marker, Polygon, Popup, TileLayer, useMapEvent} from "react-leaflet";


function Main(props) {

    // eslint-disable-next-line react/prop-types
    let [geoJSON, setgeoJSON] = useState([...props.geojson.features]);
    // eslint-disable-next-line react/prop-types
    useEffect(() => { console.log('H:', JSON.stringify(props.geojson)); setgeoJSON([...props.geojson.features]) }, [props.geojson.features]);

    let getBounds = () => {
        let allCoords = [...geoJSON.map((polygon) => {
            return polygon.geometry.coordinates
        })].flat(2)

        let line = lineString(allCoords);
        let bboxArray = bbox(line);

        let corner1 = [bboxArray[0], bboxArray[1]];
        let corner2 = [bboxArray[2], bboxArray[3]];

        return [corner1, corner2]
    }

    const [currentBound, updateCurrentBound] = useState(getBounds)


    const didMountRef = useRef(false)



    let getItems = () => {
        let out = geoJSON.map((feature, index) => {
            // console.log("COORDINATES: ", feature.geometry.coordinates[0])
            return (
                <Polygon pathOptions={{ color: 'purple' }} positions={feature.geometry.coordinates[0]} key={index}/>
            )
        })
        console.log("AllCoords: ", JSON.stringify(currentBound))
        return out;
    }

    return (
        <div className="Viewer">
            {/*{JSON.stringify(geoJSON)}*/}
            <MapContainer className={"MapContainer"} bounds={currentBound} scrollWheelZoom={false} geoJSON={geoJSON}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://www.pngmagic.com/product_images/solid-dark-grey-background.jpg"
                />
                <Marker position={[0, 0]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                {/*<Polygon pathOptions={{ color: 'purple' }} positions={geoJSON[0].geometry.coordinates[0]} key={0}/>*/}
                {getItems()}
            </MapContainer>
        </div>
    )
}

export default Main
