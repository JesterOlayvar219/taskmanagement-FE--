import { TodoContext } from "../../app/context/TodoContext";

interface TotalTasksProps {
  taskList: React.ReactNode[];
}

const TotalTasks: React.FC<TotalTasksProps> = ({ taskList }) => {
  return (
    <TodoContext.Provider value={false}>
      <div className="flex flex-col w-60 border-t-4 border border-gray-600 rounded-md bg-gray-500 p-2 px-2 z-20">
        <div className="mb-5">
          <h1 className=" text-white text-xl">All Tasks</h1>
        </div>
        <div className="max-h-[calc(48px*8)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600">
          {taskList.length > 0 && (
            <ul
              role="list"
              aria-labelledby="list-heading"
              className="flex flex-col gap-4"
            >
              {taskList}
            </ul>
          )}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default TotalTasks;
