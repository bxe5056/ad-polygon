import React, { useState } from 'react'
import './Main.css'
import leaflet from 'leaflet'
import {MapContainer, Marker, Polygon, Popup, TileLayer} from "react-leaflet";

function Main(props) {
    // eslint-disable-next-line react/prop-types
    let geoJSON = [...props.geojson.features];


    // let leafletObject = () => leaflet.map('map').setView([51.505, -0.09], 13);
    const position = [0,0]

    let getItems = () => {
        let out = geoJSON.map((feature, index) => {
            console.log("COORDINATES: ", feature.geometry.coordinates[0])
            return (
                <Polygon pathOptions={{ color: 'purple' }} positions={feature.geometry.coordinates[0]} key={index}/>
            )
        })
        console.log("OUT: ", out)
        return out;
    }

    return (
        <div className="Viewer">
            {/*{JSON.stringify(geoJSON)}*/}
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {getItems()}
                <Polygon pathOptions={{ color: 'purple' }} positions={geoJSON[0].geometry.coordinates[0]} key={0}/>
            </MapContainer>
        </div>
    )
}

export default Main
