import React, { useEffect, useState } from "react";
import { ToDo } from "./ToDo";
import "./toDoWrapper.css";
import axiosInstance from "../../axiosInstance";
import { useSelector } from "react-redux";

export const ToDoWrapper = () => {
  const token = useSelector((state) => state.auth.token);
  const [todos, setTodos] = useState([]);

  const getColClasses = (length) => {
    if (length === 1) {
      return "col-md-12";
    } else if (length === 2) {
      return "col-md-6";
    } else {
      return "col-md-4";
    }
  };

  const getList = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/tasks/", {
        headers: { token: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="TodoWrapper card">
      <h1>Your To-Do List</h1>
      <hr />
      <div className="row">
        {todos.length == 0 && <div>Your to-do-list is empty</div>}
        {todos.map((todo, index) => (
          // dari App.js
          <div className={getColClasses(todos.length)} key={index}>
            <ToDo
              task={todo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
