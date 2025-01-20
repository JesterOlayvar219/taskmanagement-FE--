import React, { useState, useRef, useContext } from "react";
import { TodoContext } from "../../app/context/TodoContext";

// Define all possible action types
type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "EDIT_TASK"; payload: { id: string; newName: string } }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "SET_FILTER"; payload: string };

interface TodoProps {
  id: string;
  name: string;
  ongoingStatue: boolean;
  dispatch: (action: Action) => void;
}

const Todo = ({ 
  id, 
  name, 
  ongoingStatue, 
  dispatch 
}: TodoProps): React.ReactElement => {
  const showCheckbox = useContext(TodoContext);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Rest of your component code remains the same...
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      dispatch({
        type: "EDIT_TASK",
        payload: { id, newName },
      });
      setEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    } else if (e.key === "Escape") {
      setEditing(false);
      setNewName(name);
    }
  };

  return (
    <li className="w-full">
      <div className="flex flex-row justify-between items-center w-full bg-white rounded-md p-2 px-2">
        <div className="relative flex items-center gap-2 flex-grow">
          {showCheckbox && (
            <>
              <input
                id={id}
                type="checkbox"
                className="peer appearance-none w-6 h-6 rounded-full border-2 border-gray-300 
                  checked:bg-blue-500 checked:border-blue-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  hover:border-blue-400
                  transition duration-200 ease-in-out"
                checked={ongoingStatue}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_TASK",
                    payload: id,
                  })
                }
              />
              <svg
                className="absolute inset-0 m-auto w-4 h-4 text-white hidden peer-checked:block"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 8 L7 11 L12 5" />
              </svg>
            </>
          )}

          {!showCheckbox && isEditing ? (
            <input
              ref={editInputRef}
              type="text"
              value={newName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmit}
              className="flex-grow border border-blue-500 h-8 px-2"
            />
          ) : (
            <label
              className="text-gray-800 peer-checked:line-through peer-checked:text-gray-400 transition duration-200 ease-in-out flex-grow"
              onDoubleClick={() => setEditing(true)}
            >
              {name}
            </label>
          )}
        </div>
        {!showCheckbox && (
          <button
            type="button"
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={handleDelete}
          >
            ✕
          </button>
        )}
      </div>
    </li>
  );
};

export default Todo;