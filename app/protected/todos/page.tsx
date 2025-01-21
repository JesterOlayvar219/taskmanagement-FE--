/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useReducer, useRef, useEffect } from "react";
import Modal from "react-modal";

import Todo from "@/components/todos/todo-item";
import FilterButton from "@/components/todos/FilterButton";
import Filter from "@/components/todos/Filter";
import SearchTask from "@/components/todos/SearchTask";

import todoReducer from "@/reducers/todoReducer";
// import TodoTasks from "@/components/todos/TodoTasks";
import AllTasks from "@/components/todos/AllTasks";
import InprogressTasks from "@/components/todos/InprogressTasks";
import ReviewTasks from "@/components/todos/ReviewTasks";
import DoneTasks from "@/components/todos/DoneTasks";
import FilterTasks from "@/components/todos/FilterTasks";
import TodoTasks from "@/components/todos/TodoTasks";
import AddTask from "@/components/todos/AddTask";
import { Task } from "@/types/Task";

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

Modal.setAppElement("#main");

const initialState: State = {
  tasks: [],
  filter: "All",
};

export default function Todos(): React.ReactElement {
  // Initial state with tasks from props and default filter

  // Use useReducer hook
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const { tasks, filter } = state;

  console.log("TASK:", state.tasks);

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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="min-h-screen bg-medium_gray_100">
      <div className="flex flex-col items-center gap-10 mb-10 ">
        <SearchTask dispatch={dispatch} />
        <div className="flex flex-row items-center space-x-1">
          <Filter
            listHeadingRef={listHeadingRef}
            headingText={headingText}
            filterList={filterList}
          />
          <div>
            <button
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              onClick={openModal}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              ADD
            </button>
          </div>
        </div>
      </div>

      <AddTask
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        dispatch={dispatch}
      />

      <div className="flex lg:flex-row lg:justify-center flex-col items-start w-full p-2 px-2 gap-8">
        <AllTasks taskList={firstTasks} />
        <TodoTasks taskList={secondTasks} />
        <InprogressTasks taskList={thirdTasks} />
        <ReviewTasks taskList={fourthTasks} />
        <DoneTasks taskList={finalTasks} />
      </div>
      <FilterTasks taskList={taskList} />
      {/* <img
        src="/assets/todos/bigleafplant.png"
        alt="bigleafplant"
        className="bottom-20 left-1/4 z-0 absolute"
        suppressHydrationWarning={true}
      />
      <img
        src="/assets/todos/lamp.png"
        alt="lamp"
        className="bottom-20 right-1/4 z-0 absolute"
        suppressHydrationWarning={true}
      />
      <img
        src="/assets/todos/table.png"
        alt="table"
        className="bottom-20 left-1/3 z-0 absolute"
        suppressHydrationWarning={true}
      />
      <img
        src="/assets/todos/plant.png"
        alt="plant"
        className="bottom-20 right-1/3 z-0 absolute"
        suppressHydrationWarning={true}
      /> */}
    </div>
  );
}
