import { TodoContext } from "@/app/context/TodoContext";
import Image from "next/image";

interface AllTasksProps {
  taskList: React.ReactNode;
}

const AllTasks:React.FC<AllTasksProps> = ({ taskList }) => {
  return (
    <TodoContext.Provider value={true}>
      <div className="flex flex-col w-60 border-t-4 border-sky-500 rounded-md bg-sky-400 p-2 px-2">
        <div className="mb-5 flex flex-row items-center gap-2">
          {/* <Image src={"/assets/todos/note.png"} alt="To Do" width={15} height={15}/> */}
          <Image
            src="/assets/todos/note.png"
            alt="ToDo"
            width={15}
            height={15}
            style={{ width: "auto", height: "auto" }}
            suppressHydrationWarning={true}
          />

          <h1 className="text-xl text-white">All</h1>
        </div>
        <div className="max-h-[calc(48px*8)] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-600">
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

export default AllTasks;
