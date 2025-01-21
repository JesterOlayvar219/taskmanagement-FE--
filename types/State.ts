import { Task } from "./Task";

export interface State {
  tasks: Task[];
  filter: string;
}
