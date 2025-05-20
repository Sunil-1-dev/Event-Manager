import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Track which todo is being edited and the new text
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = () => {
    if (editText.trim() !== "") {
      dispatch(updateTodo({ id: editId, newText: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <>
      {todos.length > 0 ? <div className="py-7 text-xl ">Todos</div> : null}
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className="text-white flex-1">
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-zinc-700 text-white px-2 py-1 rounded w-full mr-2"
                />
              ) : (
                <span>{todo.text}</span>
              )}
            </div>

            {editId === todo.id ? (
              <button
                onClick={handleUpdate}
                className="text-white bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-md ml-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEditing(todo)}
                className="text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-md ml-2"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-md ml-2"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
