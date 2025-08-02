import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";

function App() {
  return (
    <>
      <AddEvent />
      <Events />
    </>
  );
}

export default App;
