import React, { useState, useRef, useContext } from "react";
import { TodoContext } from "../../app/context/TodoContext";
import { Action } from "@/types/Action";
import Image from "next/image";

// Define all possible action types

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
  dispatch,
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
    <li className="">
      <div className="flex flex-col w-80 h-44   bg-medium_gray_200 rounded-md p-5 space-y-4">
        <div className="lex flex-col ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-2 flex-grow">
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
                  className="text-white text-[16px] font-bold peer-checked:line-through transition duration-200 ease-in-out flex-grow"
                  onDoubleClick={() => setEditing(true)}
                >
                  {name}
                </label>
              )}
            </div>
            <button type="button">
              <Image
                src={"/assets/todos/edit.png"}
                alt="Edit"
                width={26}
                height={26}
                suppressHydrationWarning={true}
              />
            </button>
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
          <span className="text-sm font-medium text-gray-500 ml-8">
            Dribble marketing
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-[6.67px]">
              <Image
                src={"/assets/todos/progress.png"}
                alt="Edit"
                width={16}
                height={16}
                suppressHydrationWarning={true}
              />
              <span className="text-gray-500 text-sm">Progress</span>
            </div>
            <span className="text-white text-sm">4/10</span>
          </div>
          <progress className="w-full h-1" value={0.7} />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center justify-center bg-medium_gray_300 w-28 h-7 rounded-xl">
            <span>24 Aug 2024</span>
          </div>
          <div className="flex flex-row items-center justify-center space-x-3">
            <div className="flex flex-row items-center justify-center space-x-1">
              <button>
                <Image
                  src={"/assets/todos/comment.png"}
                  alt="comment"
                  width={16}
                  height={16}
                  suppressHydrationWarning={true}
                />
              </button>
              <span className="text-gray-500 text-sm">7</span>
            </div>
            <div className="flex flex-row items-center justify-center space-x-1">
              <button>
                <Image
                  src={"/assets/todos/spin.png"}
                  alt="comment"
                  width={16}
                  height={16}
                  suppressHydrationWarning={true}
                />
              </button>
              <span className="text-gray-500 text-sm">2</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Todo;
