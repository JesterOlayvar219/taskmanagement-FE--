/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useReducer, useRef, useEffect } from "react";

import Todo from "@/components/todos/todo-item";
import FilterButton from "@/components/todos/FilterButton";
import Filter from "@/components/todos/Filter";
import InputTask from "@/components/todos/todo-form";

import todoReducer from "@/reducers/todoReducer";
import InitialStatus from "@/components/todos/InitialStatus";
import SecondStatus from "@/components/todos/SecondStatus";
import ThirdStatus from "@/components/todos/ThirdStatus";
import FinalStatus from "@/components/todos/FinalStatus";
import TotalTasks from "@/components/todos/TotalTasks";

// Define interfaces for our types
interface Task {
  id: string;
  name: string;
  initial: boolean;
  second: boolean;
  third: boolean;
  final: boolean;
}

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
  Second: (task: Task) => task.initial && !task.second,
  Third: (task: Task) => task.second && !task.third,
  Final: (task: Task) => task.third && task.final,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


export default function Todos(): React.ReactElement {

  // Initial state with tasks from props and default filter
  const initialState: State = {
    tasks: [],
    filter: "All",
  };

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

  const finalTasks = tasks
    .filter((task: Task) => task.third && task.final)
    .map((task: Task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        ongoingStatue={task.final}
        dispatch={dispatch}
      />
    ));

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

  return (
    <div className="min-h-screen bg-medium_gray_100 p-20 relative">
      <div className="flex flex-col items-center gap-10 mb-10">
        <InputTask dispatch={dispatch} /> 
        <Filter listHeadingRef={listHeadingRef} headingText={headingText} filterList={filterList}/>
      </div>
      <div className="flex lg:flex-row lg:justify-center flex-col items-start w-full p-2 px-2 gap-8">
        <TotalTasks taskList={taskList} />
        <InitialStatus taskList={firstTasks} />
        <SecondStatus taskList={secondTasks} />
        <ThirdStatus taskList={thirdTasks} />
        <FinalStatus taskList={finalTasks} />
      </div>
      <img src="/assets/todos/bigleafplant.png" alt="bigleafplant" className="bottom-20 left-1/4 z-10 absolute" suppressHydrationWarning={true} />
      <img src="/assets/todos/lamp.png" alt="lamp" className="bottom-20 right-1/4 z-10 absolute" suppressHydrationWarning={true} />
      <img src="/assets/todos/table.png" alt="table" className="bottom-20 left-1/3 z-10 absolute" suppressHydrationWarning={true} />
      <img src="/assets/todos/plant.png" alt="plant" className="bottom-20 right-1/3 z-10 absolute" suppressHydrationWarning={true} />
    </div>
  )
}