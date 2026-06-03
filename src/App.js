import React, { useState } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");


  // Add Task
  const addTask = () => {

    if(task.trim() === "") return;

    const newTask = {

      id: Date.now(),

      text: task,

      completed: false
    };

    setTasks([...tasks, newTask]);

    setTask("");
  };


  // Delete Task
  const deleteTask = (id) => {

    const updatedTasks =
      tasks.filter(
        (task) => task.id !== id
      );

    setTasks(updatedTasks);
  };


  // Toggle Complete
  const toggleComplete = (id) => {

    const updatedTasks =
      tasks.map((task) => {

        if(task.id === id){

          return {

            ...task,

            completed: !task.completed
          };
        }

        return task;
      });

    setTasks(updatedTasks);
  };


  // Filter Logic
  const filteredTasks =
    tasks.filter((t) => {

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

        <p>
          Stay organized. Get things done.
        </p>

        <div className="line"></div>

      </div>


      {/* Input Section */}
      <div className="input-section">

        <input
          type="text"

          placeholder="Enter a new task..."

          value={task}

          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <button
          className="add-btn"

          onClick={addTask}
        >
          Add Task +
        </button>

      </div>


      {/* Filter Buttons */}
      <div className="filter-section">

        <button
          className={
            filter === "all"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={() =>
            setFilter("all")
          }
        >
          All ({tasks.length})
        </button>


        <button
          className={
            filter === "completed"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={() =>
            setFilter("completed")
          }
        >
          Completed (
          {
            tasks.filter(
              t => t.completed
            ).length
          }
          )
        </button>


        <button
          className={
            filter === "pending"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={() =>
            setFilter("pending")
          }
        >
          Pending (
          {
            tasks.filter(
              t => !t.completed
            ).length
          }
          )
        </button>

      </div>


      {/* Task List */}
      <ul>

        {filteredTasks.map((t) => (

          <li
            key={t.id}

            className={
              t.completed
              ? "completed-task"
              : ""
            }
          >

            <div className="task-left">

              <input
                type="checkbox"

                checked={t.completed}

                onChange={() =>
                  toggleComplete(t.id)
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
                deleteTask(t.id)
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