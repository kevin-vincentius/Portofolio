import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./toDo.css";
import { useDispatch, useSelector } from "react-redux";
import { passTaskId, toggleDelete, toggleEdit } from "../../redux/taskSlice";
import DeleteConfirmation from "../DeleteConfirmation";

export const ToDo = ({ task }) => {
  const dispatch = useDispatch();
  const deleteStatus = useSelector((state) => state.task.deleteStatus);

  const handleDelete = async () => {
    dispatch(passTaskId(task._id));
    dispatch(toggleDelete());
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(toggleEdit());
    dispatch(passTaskId(task._id));
  };

  return (
    <div className="card mb-3 mr-3 shadow-sm marginbox">
      {deleteStatus && <DeleteConfirmation />}
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="container text-center">
          <h4 className="card-title">{task.title}</h4>
          <p className="card-text">{task.description}</p>
          <p className="card-text">
            <strong>Due Date:</strong> {task.dueDate.slice(0, 15)}
          </p>
          <p className="card-text">
            <strong>Priority: </strong>
            <span
              style={{
                color:
                  task.priority === "Urgent"
                    ? "red"
                    : task.priority === "High"
                    ? "orange"
                    : task.priority === "Medium"
                    ? "yellow"
                    : "green",
              }}
            >
              {task.priority}
            </span>
          </p>
          <p className="card-text">
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  task.status === "Completed"
                    ? "green"
                    : task.status === "Ongoing"
                    ? "orange"
                    : "red",
              }}
            >
              {task.status}
            </span>
          </p>
          <hr />
          <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              className="edit-icon mx-2"
              icon={faPenToSquare}
              onClick={handleEdit}
            />
            <FontAwesomeIcon
              className="delete-icon mx-2"
              icon={faTrash}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
