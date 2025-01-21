export type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "EDIT_TASK"; payload: { id: string; newName: string } }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "SEARCH_TASK"; payload: string }
  | { type: "SET_FILTER"; payload: string };
