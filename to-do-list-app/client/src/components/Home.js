import React, { useState } from "react";
import { ToDoWrapper } from "./ToDo/ToDoWrapper";
import { AddToDoForm } from "./ToDo/AddToDoForm";
import { EditToDoForm } from "./ToDo/EditToDoForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleAdd, toggleEdit } from "../redux/taskSlice";
import './home.css'
import Navbar from "./Navbar";

export const Home = () => {
  const isAdding = useSelector(state => state.task.isAdding);
  const isEditing = useSelector(state => state.task.isEditing);
  const dispatch = useDispatch();

  const handleToggle = (e) => {
    e.preventDefault();

    if ((!isAdding && !isEditing) || (isAdding && !isEditing)) {
      dispatch(toggleAdd());
    }
    if (!isAdding && isEditing) {
      dispatch(toggleEdit());
    }
  };

  return (
    <>
      <Navbar />
      <div className="Home">
        <button className="btn btn-primary" onClick={handleToggle}>
          {isAdding || isEditing ? "Back to Home" : "Add Task"}
        </button>
        {isAdding ? (
          <AddToDoForm />
        ) : isEditing ? (
          <EditToDoForm />
        ) : (
          <ToDoWrapper />
        )}
      </div>
    </>
  );
};
