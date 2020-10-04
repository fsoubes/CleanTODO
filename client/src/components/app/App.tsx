import React, { useEffect, useReducer, useState } from "react";

// Fetch
import { useFetchList } from "../../hooks/useFetchList";

// Component
import { TodoList } from "../todolist/TodoList";
import { TodoContainer } from "../todocontainer/TodoContainer";
import { Form } from "../form/Form";
import { Slider } from "../input/Slider";
import { Refresh } from "../input/Refresh";

// Reducer
import { todoListReducer } from "../../helpers/updateDataList";

// Provider
import { ThemeProvider } from "../../theme/ThemeProvider";

// Api
import { postApi } from "../../helpers/postApi";

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

const Page: React.FC = () => {
  const [{ dataList, isLoading, isError }] = useFetchList(
    process.env.DEV ? "localhost:4000/getLists" : "/getLists",
    []
  );

  const [todoList, dispatchList] = useReducer(todoListReducer, []);
  const [idx, setIdx] = useState<number>(0);
  const [names, setNames] = useState<string[] | []>([]);

  const removeList = async (): Promise<void> => {
    try {
      const currentName = names[idx];
      setIdx(0);
      await postApi({}, `deleteList/${todoList[idx]._id}`);
      dispatchList({ type: "removeList", name: currentName });
      setNames((prev) => prev.filter((item) => item !== currentName));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (dataList && dataList.length > 0) {
      setNames(dataList.map((item) => item.name));
      dispatchList({ type: "addFromDb", data: dataList });
    }
  }, [dataList]);

  return (
    <div className="todo__container">
      <div className="todo_header">
        <Slider />
        <h1>What I need to do</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Form
          action={"addList"}
          route={"addList"}
          dispatch={dispatchList}
          updateListName={setNames}
          isAddingList
        ></Form>
      </div>
      <div className="todo__list">
        {dataList && dataList.length === 0 && isLoading && <h3>Loading ...</h3>}
        {isError && <h1>Something Went Wrong :(</h1>}
        {dataList && todoList && todoList.length > 0 && !isLoading && (
          <TodoContainer
            size={todoList[idx]["tasks"].length}
            todoName={names}
            setId={setIdx}
            currentId={idx}
            deleteList={removeList}
          >
            <TodoList
              todos={todoList[idx]["tasks"]}
              editTask={dispatchList}
              currentIdx={idx}
            />
            <Form
              currentIdx={idx}
              dispatch={dispatchList}
              action={"addTodoToList"}
              route={`addToList/${todoList[idx]._id}`}
            >
              <Refresh
                currentIdx={idx}
                removeTasks={dispatchList}
                tasks={todoList[idx]["tasks"]}
              />
            </Form>
          </TodoContainer>
        )}
      </div>
    </div>
  );
};
