import React, { useState } from "react";

function TodoForms({ addTodo }) {
  const [todoMsg, setTodoMsg] = useState("");
//   const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //   this "todoMsg.trim()" is used to remove any whitespace characters (spaces, tabs, newline characters, etc.) from the beginning and end of a string
    if (todoMsg.trim()) {
      addTodo(todoMsg);
      setTodoMsg("");
    }
  };

  // To enable "enter" button on keyboard to disable editing when in editing mode
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (todoMsg.trim()) {
        addTodo(todoMsg);
        setTodoMsg("");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write Todo..."
        className=" w-[60vw] border border-black/10 rounded-lg outline-none  duration-150 font-bold  bg-white/30 p-2"
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <button
        type="submit"
        onClick={handleSubmit}
        className=" bg-amber-400 font-extrabold p-2 m-2 rounded-md duration-100 active:scale-75"
      >
        Add
      </button>
    </div>
  );
}

export default TodoForms;
