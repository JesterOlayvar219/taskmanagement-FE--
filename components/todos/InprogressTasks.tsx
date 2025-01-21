import { TodoContext } from "@/app/context/TodoContext";
import Image from "next/image";

interface InprogressTasksProps {
  taskList:React.ReactNode;
}

const InprogressTasks: React.FC<InprogressTasksProps> = ({ taskList }) => {
  return (
    <TodoContext.Provider value={true}>
      <div className="flex flex-col w-60 border-orange-500 border-t-4 rounded-md bg-orange-400 p-2 px-2">
        <div className="mb-5 flex flex-row items-center gap-2">
          <Image src={"/assets/todos/com.png"} alt="To Do" width={15} height={15} style={{ width: "auto", height: "auto" }}
            suppressHydrationWarning={true}/>
          <h1 className="text-xl text-white">In Progress</h1>
        </div>
        <div className="max-h-[calc(48px*8)] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-600">
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

export default InprogressTasks;
