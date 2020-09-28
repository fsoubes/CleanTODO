import { notification } from "antd";
import axios from "axios";

export const showSuccess = (msg: string): void => {
  notification.success({
    message: "Success",
    description: msg,
    duration: 1.25,
  });
};

export const showerror = (error: Error): void => {
  notification.error({
    message: "Error",
    description: error.message,
    duration: 1.25,
  });
};

export const addApi = async (
  todo: {
    task?: string;
    id?: string;
    completed?: boolean;
    taskIds?: string[];
  },
  route: string
): Promise<any> => {
  try {
    const response = await axios.post(`/${route}`, todo);
    const todoRes = response.data;
    showSuccess(
      todo.task ? "Todo successfully added!" : "Todo successfully updated!"
    );
    return todoRes;
  } catch (err) {
    showerror(err);
  }
};

export const postApi = async (
  todo: {
    task?: string;
    id?: string;
    completed?: boolean;
    taskIds?: string[];
  },
  route: string
): Promise<void> => {
  try {
    await axios.post(`/${route}`, todo);

    showSuccess(
      todo.task ? "Todo successfully added!" : "Todo successfully updated!"
    );
  } catch (err) {
    showerror(err);
  }
};
