import React, { useEffect, useReducer } from "react";

// Fetch
import { useFetch } from "../../hooks/useFetch";

// Component
import { TodoList } from "../todolist/TodoList";
import { TodoContainer } from "../todocontainer/TodoContainer";
import { Form } from "../form/Form";
import { Slider } from "../input/Slider";
import { Refresh } from "../input/Refresh";

// Reducer
import { todoReducer } from "../../helpers/updateData";

// Provider
import { ThemeProvider } from "../../theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

const Page: React.FC = () => {
  const [{ data, isLoading, isError }] = useFetch("/getTodo", []);

  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch({ type: "addFromDb", data: data });
    }
  }, [data]);

  return (
    <div className="todo__container">
      <div className="todo_header">
        <Slider />
        <h1>What I need to do</h1>
      </div>
      <div className="todo__list">
        {data && data.length === 0 && isLoading && <h3>Loading ...</h3>}
        {isError && <h1>Something Went Wrong :(</h1>}
        {data && !isLoading && (
          <TodoContainer size={todos.length} title={"Grocery"}>
            <TodoList data={data} todos={todos} editTask={dispatch} />
            <Form dispatch={dispatch}>
              <Refresh removeTasks={dispatch} tasks={todos} />
            </Form>
          </TodoContainer>
        )}
      </div>
    </div>
  );
};
