import { DataActionType, UpdateActionType } from "./enum";

export interface TodoType {
  _id: string;
  task: string;
  completed: boolean;
  createdAt?: string;
  time?: string;
  updatedAt?: string;
  index?: number;
}

export interface newTodo {
  task: string | null;
}
export interface EditTodo {
  index?: string;
  edit?: boolean;
}

export type DataState = {
  isLoading: boolean;
  isError: boolean;
  data: TodoType[] | undefined;
};

export type DataAction = {
  type: DataActionType;
  payload?: TodoType[];
};

export type UpdateDataAction = {
  type: string;
  data?: TodoType[] | undefined;
  update?: EditTodo;
  todo?: TodoType;
};
