import { TodoContext } from "@/app/context/TodoContext";
import Image from "next/image";
import { useState } from "react";
import AddTask from "./AddTask";
import Modal from "react-modal";
import { Action } from "@/types/Action";

interface AllTasksProps {
  taskList: React.ReactNode;
  dispatch: (action: Action) => void;
}

Modal.setAppElement("#main");

const AllTasks: React.FC<AllTasksProps> = ({ taskList, dispatch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleAddTask() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <TodoContext.Provider value={true}>
      <div className="flex flex-col w-[352px] rounded-md bg-medium_black_200 p-6 px-4 space-y-4">
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm text-gray-500 font-bold">All data(4)</span>
          <button
            className="flex flex-row justify-center items-center gap-2"
            onClick={handleAddTask}
          >
            <Image
              src="/assets/todos/plus.png"
              alt="plusBtn"
              width={18}
              height={18}
            />
            <span className="text-sm text-white font-bold">Add new task</span>
          </button>
        </div>
        <AddTask
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          dispatch={dispatch}
        />
        <div className="max-h-[826px] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-600 ">
          <ul
            role="list"
            aria-labelledby="list-heading"
            className="flex flex-col gap-[14px]"
          >
            {taskList}
          </ul>
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export default AllTasks;
