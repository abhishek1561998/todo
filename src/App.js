// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import "./App.css";
import AddTodo from "./pages/add-todo";

const App = () => {
  const [token, setToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const [showLogin, setShowLogin] = useState(true);

  const [open, setOpen] = useState(false);

  const [todoToEdit, setTodoToEdit] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) {
      fetchTodos();
    }
  }, [token, open]);

  const handleLogout = () => {
    setToken(null);
    setTodos([]);
  };

  const toggleAuthForm = () => {
    setShowLogin(!showLogin);
  };

  const addTodo = () => {
    setOpen((pre) => !pre);
  };
  const handleEdit = (todoId) => {
    const todoToEdit = todos.find((todo) => todo._id === todoId);
    setOpen((pre) => !pre);
    setTodoToEdit(todoToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="app">
      <div className="app-header">
        Todo App
        {token ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <div className="auth-tabs">
            <button
              className={`auth-tab ${showLogin ? "active" : ""}`}
              onClick={toggleAuthForm}
            >
              Login
            </button>
            <button
              className={`auth-tab ${!showLogin ? "active" : ""}`}
              onClick={toggleAuthForm}
            >
              Register
            </button>
          </div>
        )}
      </div>
      {token ? (
        <div className="todo-container">
          <div className="todo-heading">
            <h2>Todos</h2>
            {
              <button onClick={addTodo} className="logout-btn">
                Add New Todo
              </button>
            }
          </div>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <div className="todo-details">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <span
                    className={`todo-status ${
                      todo.completed ? "completed" : "pending"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Not Completed"}
                  </span>
                </div>
                <div className="delete-btn-container">
                  <button
                    className="logout-btn"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>{" "}
                  <button
                    className="logout-btn"
                    onClick={() => handleEdit(todo._id)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="auth-container">
          <div className="auth-form-container">
            {showLogin ? <Login setToken={setToken} /> : <SignUp />}
          </div>
        </div>
      )}

      {open && (
        <AddTodo
          setOpen={setOpen}
          token={token}
          todoToEdit={todoToEdit}
          setTodoToEdit={setTodoToEdit}
        />
      )}
    </div>
  );
};

export default App;
