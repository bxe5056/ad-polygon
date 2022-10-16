import React, { useEffect, useState } from 'react'

import './PolygonViewer.css'
import 'leaflet/dist/leaflet.css'

// TODO: Switch these imports to specific modules instead of mega 'turf' package
import { lineString, bbox } from "@turf/turf";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";

function PolygonViewer(props) {

    // eslint-disable-next-line react/prop-types
    let [geoJSON, setGeoJSON] = useState([...props.geojson.features]);
    // eslint-disable-next-line react/prop-types
    let [firstPolygon, setFirstPolygon] = useState(props.firstPolygon);
    // eslint-disable-next-line react/prop-types
    let [secondPolygon, setSecondPolygon] = useState(props.secondPolygon);

    // eslint-disable-next-line react/prop-types
    useEffect(() => { setGeoJSON([...props.geojson.features]) }, [props.geojson.features]);
    // eslint-disable-next-line react/prop-types
    useEffect(() => { setFirstPolygon(props.firstPolygon) }, [props.firstPolygon]);
    // eslint-disable-next-line react/prop-types
    useEffect(() => { setSecondPolygon(props.secondPolygon) }, [props.secondPolygon]);

    let getBounds = () => {
        let flattenedCoordinates = [...geoJSON.map((polygon) => {
            return polygon.geometry.coordinates
        })].flat(2)

        let line = lineString(flattenedCoordinates);
        let bboxArray = bbox(line);

        let corner1 = [bboxArray[0], bboxArray[1]];
        let corner2 = [bboxArray[2], bboxArray[3]];

        return [corner1, corner2]
    }

    let [currentBound, updateCurrentBound] = useState(getBounds)

    let getPolygons = () => {
        return geoJSON.map((feature, index) => {
            let color = 'purple';
            if (firstPolygon[1] !== undefined) {
                if (index === firstPolygon[1]) color = 'blue';
            }
            if (secondPolygon[1] !== undefined) {
                if (index === secondPolygon[1]) color = 'green';
            }
            return (
                <Polygon pathOptions={{ color: color }} positions={feature.geometry.coordinates[0]} key={index}/>
            )
        })
    }

    // noinspection JSValidateTypes
    return (
        <div className="Viewer">
            <MapContainer className={"MapContainer"} bounds={currentBound} scrollWheelZoom={false} geoJSON={geoJSON}>
                <TileLayer
                    attribution=''
                    url="https://www.pngmagic.com/product_images/solid-dark-grey-background.jpg"
                />
                <Marker position={[0, 0]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                {getPolygons()}
            </MapContainer>
        </div>
    )
}

export default PolygonViewer
