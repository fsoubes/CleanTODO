import { useReducer, useEffect } from "react";
import axios from "axios";
import { TodoList, DataStateList, DataActionList } from "../types/types";
import { DataActionType } from "../types/enum";

const dataFetchReducer = (
  state: DataStateList,
  action: DataActionList
): DataStateList => {
  switch (action.type) {
    case DataActionType.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case DataActionType.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataList: action.payload,
      };
    case DataActionType.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useFetchList = (
  url: string,
  initialData: TodoList[]
): [DataStateList, () => Promise<void>] => {
  const [state, dispatch] = useReducer<
    (state: DataStateList, action: DataActionList) => DataStateList
  >(dataFetchReducer, {
    isLoading: false,
    isError: false,
    dataList: initialData,
  });

  const fetchData = async (): Promise<void> => {
    dispatch({ type: DataActionType.FETCH_INIT });
    try {
      const result = await axios(url);
      dispatch({
        type: DataActionType.FETCH_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({ type: DataActionType.FETCH_FAILURE });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, fetchData];
};
