import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function AddTodo({ setOpen, token, todoToEdit, setTodoToEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: true,
  });

  useEffect(() => {
    if (todoToEdit) {
      setFormData({
        title: todoToEdit.title,
        description: todoToEdit.description,
        completed: todoToEdit.completed,
      });
    }
  }, [todoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (todoToEdit) {
        await axios.put(
          `http://localhost:5000/api/todos/${todoToEdit._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Todo updated successfully");
        setOpen(false);
        setTodoToEdit(null);
      } else {
        await axios.post("http://localhost:5000/api/todos", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Todo added successfully");
      }
      setOpen(false);
    } catch (error) {
      console.error("Error adding/updating todo:", error);
      setOpen(false);
      setTodoToEdit(null);
    }
  };

  return (
    <div className="signup-container add-todo-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="signup-input"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="signup-input"
          required
        />
        <label htmlFor="completed">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={() =>
              setFormData({
                ...formData,
                completed: !formData.completed,
              })
            }
          />{" "}
          Completed
        </label>
        <button type="submit" className="signup-button">
          {todoToEdit ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
