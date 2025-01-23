import { Action } from "@/types/Action";
import React, { useState } from "react";
import Image from "next/image";

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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center items-center">
          <input
            type="text"
            className="h-7 w-60 rounded-lg border border-gray-300 bg-gray-500 focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 px-3"
            placeholder="searching"
            name="name"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
          <button type="submit">
            <Image
              src={"/assets/todos/search.png"}
              alt="search"
              width={25}
              height={25}
              suppressHydrationWarning={true}
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchTask;
