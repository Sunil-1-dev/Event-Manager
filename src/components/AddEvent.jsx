import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../features/event/eventSlice";
import { v4 as uuidv4 } from "uuid";

function AddEvent() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const { title, description, venue, date } = formData;
    if (!title || !description || !venue || !date) {
      setError("All fields are required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const newEvent = {
      ...formData,
      id: uuidv4(),
    };

    dispatch(addEvent(newEvent));

    // Reset form
    setFormData({
      title: "",
      description: "",
      venue: "",
      date: "",
    });
    setError("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mt-10 bg-zinc-900 p-6 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Add New Event
        </h2>

        <div>
          <label className="block text-gray-300 mb-1">Event Title</label>
          <input
            name="title"
            placeholder="Enter event title"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter event description"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Venue</label>
          <input
            name="venue"
            placeholder="Enter venue"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Event Date</label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Add Event
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </>
  );
}

export default AddEvent;
