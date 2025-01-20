import React from "react";
import Form from "./Form";

interface InputTaskProps {
  dispatch: (action: any) => void;
}

const InputTask: React.FC<InputTaskProps> = ({ dispatch }) => {
  return (
    <>
      <div className="">
        <h1 className="text-3xl text-black font-bold">Input Tasks</h1>
      </div>
      <Form dispatch={dispatch}/>
    </>
  );
}

export default InputTask;

