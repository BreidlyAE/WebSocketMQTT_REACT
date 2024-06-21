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
  const [size, setSize] = useState(100); // Estado para el tamaño del cuadro

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

  const handleInputChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
  };

  return (
    <div className="App">
      <input
        type="number"
        value={size}
        onChange={handleInputChange}
        placeholder="Enter size"
      />
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "lightblue",
          margin: "10px auto",
        }}
      >
        {/* Cuadro cuyo tamaño varía */}
      </div>

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
