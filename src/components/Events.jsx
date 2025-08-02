import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../features/event/eventSlice";

function Events() {
  const events = useSelector((state) => state.event.events);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
  });

  const startEditing = (event) => {
    setEditId(event.id);
    setEditData({
      title: event.title,
      description: event.description,
      venue: event.venue,
      date: event.date,
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (
      !editData.title ||
      !editData.description ||
      !editData.venue ||
      !editData.date
    ) {
      alert("All fields are required");
      return;
    }

    dispatch(updateEvent({ ...editData, id: editId }));
    setEditId(null);
    setEditData({
      title: "",
      description: "",
      venue: "",
      date: "",
    });
  };

  return (
    <>
      {events.length > 0 && <div className="py-7 text-xl">Events</div>}
      <ul className="list-none">
        {events.map((event) => (
          <li
            key={event.id}
            className="mt-4 bg-zinc-800 text-white p-4 rounded space-y-2"
          >
            {editId === event.id ? (
              <>
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-zinc-700"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-zinc-700"
                  placeholder="Description"
                />
                <input
                  name="venue"
                  value={editData.venue}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-zinc-700"
                  placeholder="Venue"
                />
                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-zinc-700"
                />
              </>
            ) : (
              <>
                <div className="bg-zinc-800 p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 space-y-2">
                  <h2 className="text-2xl font-semibold text-indigo-400">
                    {event.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="material-icons text-indigo-300">
                      event
                    </span>
                    <span>{new Date(event.date).toDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="material-icons text-green-300">place</span>
                    <span>{event.venue}</span>
                  </div>

                  <p className="text-gray-200 mt-2">{event.description}</p>
                </div>
              </>
            )}

            <div className="flex gap-2 mt-2">
              {editId === event.id ? (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(event)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => dispatch(deleteEvent(event.id))}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Events;
