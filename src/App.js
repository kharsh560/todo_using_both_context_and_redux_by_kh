import { useEffect, useState } from "react";
import TodoForms from "./components/todoForms";
import TodoList from "./components/todoList";
function App() {
  const [todosArray, setTodosArray] = useState([]);

  const addTodosToArray = (message) => {
    setTodosArray((prevTodos) => [...prevTodos, { message, id: Date.now(), isCompleted: false, expand: false }]);
  }

  const toggleCompleteInOriginalArray = (id) => {
    setTodosArray((prev) => prev.map((eachTodo) => eachTodo.id === id ? {...eachTodo, isCompleted: !eachTodo.isCompleted} : eachTodo))
  }

  const deleteTodoFromOriginalArray = (id) => {
    // setTodosArray((prev) => prev.filter((eachTodo) => eachTodo !== id))
    setTodosArray((prev) => prev.filter((eachTodo) => eachTodo.id !== id));
  }

  // const updateTodoFromOriginalArray = (id, recievedMessage) => {
  //   setTodosArray((prev) => prev.map((eachTodo) => eachTodo.id === id ? {...eachTodo, message: recievedMessage} : eachTodo ))
  // };
  // it was not needed as the access of "setTodosArray" was directly given to the child.

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodosArray(todos);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosArray));
  }, [todosArray]);



  return (
    <div className=" bg-zinc-800 p-4 w-screen min-h-screen flex flex-col items-center space-y-5">
      <h1 className=" text-2xl  text-amber-400 font-semibold text-center ">
        Todo App with-out using ANY state management tools like: <br/> Context-API &
        Redux-Toolkit
      </h1>
      <TodoForms addTodo={addTodosToArray} />

      {/*Loop and Add TodoItem here */}
      {todosArray.map((individualTodo) => (
        <div key={individualTodo.id} className="w-full">
          <TodoList
            todoObject={individualTodo}
            toggleComplete={toggleCompleteInOriginalArray}
            deleteTodoFromArray={deleteTodoFromOriginalArray}
            updateTodoFromArray={setTodosArray}
          />
        </div>
      ))}
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
