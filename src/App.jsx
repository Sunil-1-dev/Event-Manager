import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector } from "react-redux";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
        } else {
          console.error("Parsed events is not an array");
        }
      } catch (e) {
        console.error("Failed to parse events from localStorage:", e);
      }
    }
  }, []);

  return (
    <>
      <AddEvent />
      <Events />
    </>
  );
}

export default App;
