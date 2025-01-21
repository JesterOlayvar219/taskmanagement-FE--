import { Action } from "@/types/Action";
import { State } from "@/types/State";
import { nanoid } from "nanoid";

// Uniion type for Actions

export default function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: `todo-${nanoid()}`,
            name: action.payload,
            initial: false,
            second: false,
            third: false,
            fourth: false,
            final: false,
          },
        ],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            if (!task.initial) {
              // Move from Initial to Second
              return {
                ...task,
                initial: true,
                second: false,
                third: false,
                fourth: false,
                final: false,
              };
            } else if (task.initial && !task.second) {
              // Move from Second to Third
              return {
                ...task,
                initial: true,
                second: true,
                third: false,
                fourth: false,
                final: false,
              };
            } else if (task.second && !task.third) {
              // Move from Third to Fourth
              return {
                ...task,
                initial: true,
                second: true,
                third: true,
                fourth: false,
                final: false,
              };
            } else if (task.third && !task.fourth) {
              // Move from fourth to Final
              return {
                ...task,
                initial: true,
                second: true,
                third: true,
                fourth: true,
                final: true,
              };
            }
          }
          return task;
        }),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, name: action.payload.newName }
            : task
        ),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SEARCH_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.name === action.payload),
      };
    default:
      return state;
  }
}
