import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage on app start
const savedEvents = JSON.parse(localStorage.getItem("events")) || [];

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: savedEvents,
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
        localStorage.setItem("events", JSON.stringify(state.events));
      }
    },
  },
});

export const { addEvent, deleteEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;
