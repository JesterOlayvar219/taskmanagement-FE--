import { TodoContext } from "@/app/context/TodoContext";
import Image from "next/image";


interface TodoTasksProps {
  taskList: React.ReactNode;
}

const TodoTasks: React.FC<TodoTasksProps> = ({ taskList }) => {
  return (
    <TodoContext.Provider value={true}>
      <div className="flex flex-col w-60 rounded-md bg-purple-400 border-purple-500 border-t-4 p-2 px-2 ">
        <div className="mb-5 flex flex-row items-center gap-2">
          <Image src={"/assets/todos/pen.png"} alt="Todo" width={15} height={15} style={{ width: "auto", height: "auto" }}
            suppressHydrationWarning={true}/>
          <h1 className="text-xl text-white">To do</h1>
        </div>
        <div className="max-h-[calc(48px*8)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-600">
          <ul
            role="list"
            aria-labelledby="list-heading"
            className="flex flex-col gap-4"
          >
            {taskList}
          </ul>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default TodoTasks;
