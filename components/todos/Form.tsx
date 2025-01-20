import React, { useState } from "react";

interface FormProps {
  dispatch: (action: TaskAction) => void;
}

interface TaskAction {
  type: "ADD_TASK";
  payload: string;
}

const Form: React.FC<FormProps> = ({ dispatch }) => {  
  const [name, setName] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
    event.preventDefault();
    if (name.trim()) {
      dispatch({ type: "ADD_TASK", payload: name });
      setName("");
    }
  }
  
  return (
  <form onSubmit={handleSubmit}>
    <div className="inline-flex" role="group">
      <input type="text" id="new-todo-input" className="py-2 lg:px-20 px-5 border rounded h-14 placeholder:italic placeholder:text-gray-400 text-2xl focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-red-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
      name="text"
      autoComplete="off"
      placeholder="What needs to be done?"
      value={name}
      onChange={handleChange}
      />
    </div>
  </form>
);
}

export default Form;