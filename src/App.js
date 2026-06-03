import React, { useState } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = () => {

    if(task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTask("");
  };

  const deleteTask = (index) => {

    const updatedTasks =
      tasks.filter((_, i) => i !== index);

    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {

    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };
  const filteredTasks = tasks.filter((t) => {

  if(filter === "completed"){
    return t.completed;
  }

  if(filter === "pending"){
    return !t.completed;
  }

  return true;
});
  return (

    <div className="container">

      <div className="title-section">

        <h1>📝 My To-Do List</h1>

        <p>Stay organized. Get things done.</p>

        <div className="line"></div>

      </div>

      <div className="input-section">

        <input
          type="text"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={addTask}
        >
          Add Task +
        </button>

      </div>

      <div className="filter-section">

  <button
    className={
      filter === "all"
      ? "filter-btn active"
      : "filter-btn"
    }

    onClick={() => setFilter("all")}
  >
    All ({tasks.length})
  </button>

  <button
    className={
      filter === "completed"
      ? "filter-btn active"
      : "filter-btn"
    }

    onClick={() => setFilter("completed")}
  >
    Completed (
    {
      tasks.filter(t => t.completed).length
    }
    )
  </button>

  <button
    className={
      filter === "pending"
      ? "filter-btn active"
      : "filter-btn"
    }

    onClick={() => setFilter("pending")}
  >
    Pending (
    {
      tasks.filter(t => !t.completed).length
    }
    )
  </button>

</div>

      <ul>

        {filteredTasks.map((t, index) => (

          <li
            key={index}
            className={
              t.completed ? "completed-task" : ""
            }
          >

            <div className="task-left">

              <input
                type="checkbox"
                checked={t.completed}
                onChange={() =>
                  toggleComplete(index)
                }
              />

              <div>

                <span
                  className={
                    t.completed
                    ? "completed"
                    : ""
                  }
                >
                  {t.text}
                </span>

                <p>No due date</p>

              </div>

            </div>

            <button
              className="delete-btn"
              onClick={() =>
                deleteTask(index)
              }
            >
              🗑
            </button>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default App;