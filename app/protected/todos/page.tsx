/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useReducer, useRef, useEffect } from "react";

import Todo from "@/components/todos/todo-item";
import FilterButton from "@/components/todos/FilterButton";
import Filter from "@/components/todos/Filter";
import SearchTask from "@/components/todos/SearchTask";

import todoReducer from "@/reducers/todoReducer";
import AllTasks from "@/components/todos/AllTasks";
import InprogressTasks from "@/components/todos/InprogressTasks";
import ReviewTasks from "@/components/todos/ReviewTasks";
import DoneTasks from "@/components/todos/DoneTasks";
import FilterTasks from "@/components/todos/FilterTasks";
import TodoTasks from "@/components/todos/TodoTasks";
import { Task } from "@/types/Task";
// import DropdownBtn from "@/components/todos/dropdown";

// Define interfaces for our types

interface State {
  tasks: Task[];
  filter: string;
}

type FilterFunction = (task: Task) => boolean;

// Helper function to get previous value
function usePrevious<T>(value: T): T | null {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Filter constants
const FILTER_MAP: Record<string, FilterFunction> = {
  All: () => true,
  Initial: (task: Task) => !task.initial,
  Todo: (task: Task) => task.initial && !task.second,
  InProgress: (task: Task) => task.second && !task.third,
  Review: (task: Task) => task.third && !task.fourth,
  Done: (task: Task) => task.fourth && task.final,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

// Modal.setAppElement("#main");

const initialState: State = {
  tasks: [],
  filter: "All",
};

export default function Todos(): React.ReactElement {
  // Initial state with tasks from props and default filter

  // Use useReducer hook
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const { tasks, filter } = state;

  // Ref for list heading
  const listHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const prevTaskLength = usePrevious<number>(tasks.length);

  // Focus management effect
  useEffect(() => {
    if (tasks.length < prevTaskLength! && listHeadingRef.current) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  // Create separate lists for each status
  const firstTasks = tasks
    .filter((task: Task) => !task.initial)
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.initial}
        dispatch={dispatch}
      />
    ));

  const secondTasks = tasks
    .filter((task: Task) => task.initial && !task.second)
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.second}
        dispatch={dispatch}
      />
    ));

  const thirdTasks = tasks
    .filter((task: Task) => task.second && !task.third)
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.third}
        dispatch={dispatch}
      />
    ));

  const fourthTasks = tasks
    .filter((task: Task) => task.third && !task.fourth)
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.fourth}
        dispatch={dispatch}
      />
    ));

  const finalTasks = tasks
    .filter((task: Task) => task.fourth && task.final)
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.final}
        dispatch={dispatch}
      />
    ));

  // const searchTasks = tasks

  // Filtered and mapped task list with checkboxes (for InitialStatus)
  const taskList = tasks
    .filter(FILTER_MAP[filter || "All"])
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.initial}
        dispatch={dispatch}
      />
    ));

  // Filter buttons
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      dispatch={dispatch}
    />
  ));

  // Task count text
  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const headingText = `${taskList.length} ${tasksNoun} `;

  // const handleSelect = (item: string) => {
  //   alert(`You selected: ${item}`);
  // };

  return (
    <div className="min-h-screen bg-medium_black_100 flex flex-row">
      {/* <div className="w-1/6 bg-medium_black_200 px-7 py-8">
        <div>
          <h2 className="text-3xl text-white font-bold">Project</h2>
        </div>
      </div> */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center "></div>
        <div className="">
          <div className="h-24 py-7 px-8 flex flex-row justify-between items-center">
            <div className="">
              <h2 className="text-white text-xl font-bold">
                Welcome back, Dragon
              </h2>
            </div>
            <div className="flex flex-row gap-5 justify-center items-center">
              <SearchTask dispatch={dispatch} />
              <button>
                <img
                  src="/assets/todos/alarm.png"
                  alt="search"
                  className=""
                  suppressHydrationWarning={true}
                />
              </button>
              <button>
                <img
                  src="/assets/todos/calendar.png"
                  alt="search"
                  className=""
                  suppressHydrationWarning={true}
                />
              </button>
              <button>
                <img
                  src="/assets/todos/image.png"
                  alt="avatar"
                  className="border rounded-full "
                  suppressHydrationWarning={true}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col p-8">
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-500">
              <div className="flex flex-row border-b-2 border-white p-4 gap-4">
                <img
                  src="/assets/todos/board.png"
                  alt="board"
                  suppressHydrationWarning={true}
                />
                <span className="text-sm text-white">Board view</span>
              </div>
              <div className="flex flex-row gap-4 justify-between items-center">
                <Filter
                  listHeadingRef={listHeadingRef}
                  headingText={headingText}
                  filterList={filterList}
                />
                {/* <DropdownBtn
                  label="Filter"
                  items={[
                    "All",
                    "Initial",
                    "Todo",
                    "InProgress",
                    "Review",
                    "Done",
                  ]}
                  onSelect={handleSelect}
                /> */}
                <button>
                  <span className="text-gray-300 text-sm font-bold">Sort</span>
                </button>
                <button>
                  <img
                    src="/assets/todos/sort.png"
                    alt="sort"
                    suppressHydrationWarning={true}
                  />
                </button>
                <button className="bg-blue-600 rounded-3xl py-3 px-6 tex-sm text-white font-bold">
                  New template
                </button>
              </div>
            </div>
            <div className="flex lg:flex-row lg:justify-center flex-col items-start w-full py-5 gap-5">
              <AllTasks taskList={firstTasks} dispatch={dispatch} />
              <TodoTasks taskList={secondTasks} />
              <InprogressTasks taskList={thirdTasks} />
              <ReviewTasks taskList={fourthTasks} />
              <DoneTasks taskList={finalTasks} />
            </div>

            <FilterTasks taskList={taskList} />
          </div>
        </div>
      </div>
    </div>
  );
}
