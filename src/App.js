import React, {useState, useEffect} from 'react';
// import socket from './componentes/Socket';
import './App.css';
import Chat from './componentes/Chat';
import Mapa from './componentes/Map';
import Information from './componentes/Information';

// const io = require("socket.io-client")
// const socket = io.connect('ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
//     path:'/trucks'
// });

function App() {
  // socket.emit('conectado', 'hola desde el cliente');
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  // const [camiones, setCamiones] = useState(['CAT013']);




  const registrar = (e) => {
    e.preventDefault();
    if(nombre !== ""){
      setRegistrado(true);
    }
  }

  return (
    <div className="App">
      {
        !registrado &&
        <div className="form">
          <div className="title">Bienvenido</div>
          <div className="subtitle">¡Ingresa un Nickname!</div>
          <div className="input-container ic1">
            <form onSubmit={registrar}>
              <input className="input" value={nombre} onChange={e => setNombre(e.target.value)}/>
              <button className="submit">Ingresar</button>
            </form>
          </div>
        </div>
      }
      {
        registrado &&
        <div className="wrapper">

          <div className="column">

            <div className="row">
              <div className="App-component">
                <div className="App-map">
                  <Mapa/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="App-component">
                <div className="App-information">
                  <Information />
                </div>
              </div>
            </div>

          </div>

          <div className="column">
            <div className="App-component">
              <div className="App-chat">
                <Chat nombre={nombre}/>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  );
}

export default App;
