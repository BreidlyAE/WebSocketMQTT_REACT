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
  return (
    <div className="App">
      <button
        onClick={() => {
          // ENVIO DE DATOS ==================================================
          socket.emit("from_react", ":v " + Date.now());
          //==================================================================
        }}
      >
        Enviar
      </button>
    </div>
  );
}

export default App;
