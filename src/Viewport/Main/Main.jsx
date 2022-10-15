import React, { useState } from 'react'
import './Main.css'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { lineString, bbox, bboxPolygon } from "@turf/turf";
import {MapContainer, Marker, Polygon, Popup, TileLayer} from "react-leaflet";


function Main(props) {
    // eslint-disable-next-line react/prop-types
    let geoJSON = [...props.geojson.features];


    // let leafletObject = () => leaflet.map('map').setView([51.505, -0.09], 13);
    let allCoords = [...geoJSON.map((polygon) => {
        return polygon.geometry.coordinates
    })].flat(2)
    let line = lineString(allCoords);
    let bboxArray = bbox(line);
    const corner1 = [bboxArray[0], bboxArray[1]];
    const corner2 = [bboxArray[2], bboxArray[3]];
    let bounds = [corner1, corner2]
    // let bboxPolygons = bboxPolygon(bboxs);

    const position = [51.505, -0.09]

    let getItems = () => {
        let out = geoJSON.map((feature, index) => {
            console.log("COORDINATES: ", feature.geometry.coordinates[0])
            return (
                <Polygon pathOptions={{ color: 'purple' }} positions={feature.geometry.coordinates[0]} key={index}/>
            )
        })
        console.log("AllCoords: ", bounds)
        return out;
    }

    return (
        <div className="Viewer">
            {/*{JSON.stringify(geoJSON)}*/}
            <MapContainer className={"MapContainer"} bounds={bounds} scrollWheelZoom={false}>
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
