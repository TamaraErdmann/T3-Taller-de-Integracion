import React, { useState, useEffect, useRef} from "react";
import "./Chat.css";
import moment from "moment";

const io = require("socket.io-client")
const socket = io.connect('ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
    path:'/trucks'
});

const Chat = ({ nombre }) => {
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        socket.on('CHAT', chat =>{
            console.log("Recibiendo mensaje", chat)
            setMensajes([...mensajes, chat]);
        })
        console.log("mensajes", mensajes)
        return() => {socket.off()}
        
    }, [mensajes])

    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth'});
    })

    const submit = (e) => {
        e.preventDefault();
        var mensaje_envio = { 
            message: mensaje,
            name: nombre
          };
        socket.emit('CHAT', mensaje_envio)
        console.log("enviado", mensaje_envio)
        setMensaje("")
    }

    return (
        <div>
            <div className="fondo">
                <div className="chat">
                    {mensajes.map((e, i) => 
                    <div className="card" key={i}>
                        <div className="header">
                            <p>{e.name}</p>
                        </div>
                        <div className="container">
                            <p>{e.message}</p>
                            <h5>{moment(new Date(e.date)).format('DD/MM/YYYY - hh:mm:ss')}</h5>
                        </div>
                    </div>)}
                    <div ref={divRef}></div>
                </div>
                <form onSubmit={submit}>
                    <textarea className="texto" name="" id="" cols="30" rows="10" value={mensaje} onChange={e => setMensaje(e.target.value)}>
                    </textarea>
                    <button className="boton">Enviar</button>
                </form>
            </div>
        </div>

    )
}

export default Chat;