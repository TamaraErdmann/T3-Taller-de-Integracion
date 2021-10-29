import React, {useState, useEffect, useRef} from "react";
import {MapContainer, TileLayer, Marker, Popup} from'react-leaflet'

const io = require("socket.io-client")
const socket = io.connect('ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
    path:'/trucks'
});

const position1 = [-19.9384704, -68.85334953472223]
const position2 = [-21.936, -68.85334953472227]

const Mapa = () => {
    const [posiciones, setPosiciones] = useState({});
    const [codes, setCode] = useState([]);

    useEffect(() => {
        socket.on('POSITION', info =>{
            console.log("1) info.code", info.code)
            posiciones[info.code] = info.position
            setPosiciones(posiciones)
            if (!(codes.includes(info.code))){
                console.log("2) No existia antes",codes)
                setCode((codes) => [info.code, ...codes]);
            }
            // codigos = Object.keys(posiciones)
            console.log("2 o 3) codes",codes)
            console.log("POSICIONES", posiciones)
            
        })
        return() => {socket.off()}
    }, [posiciones])


    return (
        <div>
        <MapContainer center={[-21.965, -68.8]} zoom={12.3} style={{ height: '50vh', width: '50vw' }} scrollWheelZoom={false} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {codes.map(code =>
                <Marker position={posiciones[code]}>
                    <Popup>
                        Latitud: {posiciones[code][0]}<br/> Longitud: {posiciones[code][1]}
                    </Popup>
                </Marker>
                )};
        </MapContainer>
        </div>

    )
}
export default Mapa


// class Mapa extends Component{

//         return(

//             <Map center={[-35.6, -71.54]} zoom={4}>
//                 <TileLayer
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//             </Map>

//         );


// }

// export default Mapa;