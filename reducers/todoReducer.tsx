import { nanoid } from "nanoid";
// Reducer function
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
  filter ?: string;
}

interface AddTaskAction {
  type: "ADD_TASK";
  payload: string;
}

interface ToggleTaskAction {
  type: "TOGGLE_TASK";
  payload: string;
}

interface DeleteTaskAction {
  type: "DELETE_TASK";
  payload: string;
}

interface EditTaskAction {
  type: "EDIT_TASK";
  payload: {
    id: string;
    newName: string;
  }
}

interface SetFilterAction {
  type: "SET_FILTER";
  payload: string;
}

// Uniion type for Actions
type Action =  
  | AddTaskAction
  | ToggleTaskAction
  | DeleteTaskAction
  | EditTaskAction
  | SetFilterAction;

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
                final: false,
              };
            } else if (task.initial && !task.second) {
              // Move from Second to Third
              return {
                ...task,
                initial: true,
                second: true,
                third: false,
                final: false,
              };
            } else if (task.second && !task.third) {
              // Move from Third to Final
              return {
                ...task,
                initial: true,
                second: true,
                third: true,
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
    default:
      return state;
  }
}
