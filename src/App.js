import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
//====================    RECEPCION DE DATOS   ==========================
const socket = io("http://localhost:8000");

socket.on("connect", () => {});
socket.on("maestro1/puerto2", (data) => {
  console.log("received testing", data);
});
//=====================================================================
function App() {
  const [timestamp, setTimestamp] = useState(0);

  const handleMouseDown = (event) => {
    console.log("Boton_presionado:", true);
    socket.emit("boton_presionadoSocketIO", true);
    setTimestamp(Date.now());
  };

  const handleMouseUp = (event) => {
    console.log("boton_presionado:", false);
    socket.emit("boton_presionadoSocketIO", false);
    console.log(Date.now() - timestamp);
  };

  return (
    <div className="App">
      <button
        onClick={(event) => {
          const message = ":v" + Date.now();
          // ENVIO DE DATOS ==================================================
          socket.emit("from_react", message);
          //==================================================================
          console.log("Mensaje enviado:", message);
          console.log("Evento de clic", event);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        Enviar
      </button>
    </div>
  );
}

export default App;
