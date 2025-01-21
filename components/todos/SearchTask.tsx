import { Action } from "@/types/Action";
import React, { useState } from "react";

interface SearchTaskProps {
  dispatch: (action: Action) => void;
}

const SearchTask: React.FC<SearchTaskProps> = ({ dispatch }) => {
  const [name, setName] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (name.trim()) {
      dispatch({ type: "SEARCH_TASK", payload: name });
      setName("");
    }
  }

  return (
    <>
      <div className="">
        <h1 className="text-3xl text-black font-bold">Input Tasks</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo-input"
          className="py-2 lg:px-20 px-5 border rounded h-14 placeholder:italic placeholder:text-gray-400 text-2xl focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-red-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          name="name"
          autoComplete="off"
          placeholder="Search"
          value={name}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default SearchTask;
