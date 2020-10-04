import { DataActionType } from "./enum";

export interface TodoType {
  _id: string;
  task: string;
  completed: boolean;
  createdAt?: string;
  time?: string;
  updatedAt?: string;
  index?: number;
}

export interface TodoList {
  _id: string;
  name?: string;
  tasks?: TodoType[];
}

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
  todo?: TodoType;
  id?: number;
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

export type DataStateList = {
  isLoading: boolean;
  isError: boolean;
  dataList: TodoList[] | undefined;
};

export type DataActionList = {
  type: DataActionType;
  payload?: TodoList[];
};

export type UpdateDataAction = {
  type: string;
  data?: TodoType[] | undefined;
  update?: EditTodo;
  todo?: TodoType;
};

export type UpdateDataActionList = {
  type: string;
  data?: TodoList[] | undefined;
  update?: EditTodo;
  todoList?: TodoList;
  todo?: TodoType;
  name?: string;
  id?: number;
};
