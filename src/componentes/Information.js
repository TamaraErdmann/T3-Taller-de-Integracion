import React, {useState, useEffect, useRef} from "react";
import "./Information.css";

const io = require("socket.io-client")
const socket = io.connect('ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
    path:'/trucks'
});

const Information = () => {
    const [camiones, setCamiones] = useState([]);
    const [fallas, setFallas] = useState({});
    const [fix_code, setCode] = useState({});

    useEffect(() => {
        socket.on('FAILURE', failoure =>{
            console.log("Recibiendo falla", failoure)
            fallas[failoure.code] = failoure.source;
            console.log("fallas", fallas )
        })

        socket.on('FIX', failoure =>{
            console.log("Arreglando falla", failoure)
            if (fallas[failoure.code]){
                delete fallas[failoure.code];
            }
            console.log("fallas", fallas )
        }) 

        socket.on('TRUCKS', info =>{
            console.log("escuchando socket", info)
            setCamiones(info); 
        })

        return() => {socket.off()}
        
        
    }, [fallas])
   

    const submit = (e) => {
        e.preventDefault();
        socket.emit('TRUCKS')
        console.log("enviado", "Solicitando información de trucks")
    }

    return (
        <div className="fondo_information">
            <form onSubmit={submit}>
                <button className="boton_information">Refrescar información de camiones</button>
            </form>
            <div className="box">
                {camiones.map((e, i) => 
                    <div className="card-information" key={i}>
                        <div className="header-information">
                            <p>Camión {e.truck}</p>
                        </div>
                        <div className="container">
                            <h4>Capacidad: {e.capacity}</h4>
                            <h4>Código: {e.code}</h4>
                            <h4>Motor: {e.engine}</h4>
                            <h4>Origen: lat {e.origin[0]},  long {e.origin[1]}</h4>
                            <h4>Destino: lat {e.destination[0]},  long {e.destination[1]}</h4>
                            <h4>Staff:</h4>
                            {e.staff.map((s,i) =>
                                <p>- {s.name} ({s.age} años)</p>
                            )}
                            {e.code in fallas &&
                            <div>
                                <h4>Falla: {fallas[e.code]}</h4>
                                <button className="boton_falla">Reparar falla </button>
                            </div>}
                            {!(e.code in fallas) &&
                            <div>
                                <h4>No hay fallas</h4>
                            </div>}
                        </div>
                    </div>
                    )}
            </div>
        </div>

    )
}

export default Information;