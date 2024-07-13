import React, { useEffect, useRef, useState } from "react";

function TodoList({
  todoObject,
  toggleComplete,
  deleteTodoFromArray,
  updateTodoFromArray,
}) {
  const [isEditable, setIsEditable] = useState(false);
  //   const [isCompleted, setIsCompleted] = useState(false);
  //   const [todoMessage, setTodoMessage] = useState("");
  // To automatically bring the cursor to the input box when the pencil icon is clicked and isEditable turns true.
  const inputRef = useRef(null);

  const editTodoMessage = () => {
    setIsEditable((prev) => !prev);
    // updateTodoFromArray((prev) =>
    //   prev.map((eachTodo) =>
    //     eachTodo.id === todoObject.id
    //       ? { ...eachTodo, message: todoMessage }
    //       : eachTodo
    //   )
    // );
    // updateTodoFromArray(todoObject.id, todoMessage);
  };

  // To enable "enter" button on keyboard to disable editing when in editing mode
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditable(false);
      //   updateTodoFromArray(todoObject.id, todoMessage);
    }
  };

  const toggleCompleteCheckbox = () => {
    // setIsCompleted((prev) => !prev);
    // See, you are being sent each of the individual todo object;
    toggleComplete(todoObject.id);
  };

  const deleteTodoFromList = () => {
    console.log(todoObject.id);
    console.log(todoObject);
    deleteTodoFromArray(todoObject.id);
  };

  //   const updateTodoFromList = () => {
  //     updateTodoFromArray()
  //   }

  // To automatically bring the cursor to the input box when the pencil icon is clicked and isEditable turns true.

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const expandTheTodo = () => {
    // (e) => {
    //   updateTodoFromArray((prev) =>
    //     prev.map((eachTodo) =>
    //       eachTodo.id === todoObject.id
    //         ? { ...eachTodo, expand: !todoObject.expand }
    //         : eachTodo
    //     )
    //   );
    // };
  };

  return (
    <div
      className={` bg-teal-400 p-2 rounded-3xl  flex space-x-3 duration-200  ${
        todoObject.isCompleted ? " bg-emerald-400" : ""
      }
       `}
    >
      {/* Checkbox for todo-completd/not */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todoObject.isCompleted}
        // onChange={toggleCompleteCheckbox}
        onChange={(e) =>
          updateTodoFromArray((prev) =>
            prev.map((eachTodo) =>
              eachTodo.id === todoObject.id
                ? { ...eachTodo, isCompleted: !todoObject.isCompleted }
                : eachTodo
            )
          )
        }
      />
      {/* Input for individual todo */}
      <input
        type="text"
        ref={inputRef}
        className={` bg-transparent w-full font-medium  
        ${
          isEditable
            ? "outline-none border-red-600 border-2 rounded-md p-1"
            : "outline-none"
        } 
        ${todoObject.isCompleted ? "line-through" : ""}`}
        // value={todoMessage}
        value={todoObject.message}
        readOnly={!isEditable}
        // onChange={(e) => setTodoMessage(e.target.value)}
        onChange={(e) =>
          updateTodoFromArray((prev) =>
            prev.map((eachTodo) =>
              eachTodo.id === todoObject.id
                ? { ...eachTodo, message: e.target.value }
                : eachTodo
            )
          )
        }
        onKeyPress={handleKeyPress}
      />
      {/* Expand button */}
      {/* <button
        onClick={expandTheTodo}
      >
        expand
      </button> */}
      {/* Edit/Save button */}
      <button
        onClick={editTodoMessage}
        disabled={todoObject.isCompleted}
        className={`${todoObject.isCompleted ? "opacity-60" : ""}`}
      >
        {isEditable ? "📁" : "✏️"}
      </button>
      <button onClick={deleteTodoFromList}>❌</button>
    </div>
  );
}

export default TodoList;
