import React, { useEffect, useState } from "react";
import "./addToDoForm.css";
import axiosInstance from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toggleEdit } from "../../redux/taskSlice";

export const EditToDoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("-");
  const [duedate, setDuedate] = useState(null);
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Not Started");
  const [error, setError] = useState(null);

  const task_id = useSelector((state) => state.task.id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  
  const getTask = async () => {
    try {
      await axiosInstance
        .get(`/api/v1/tasks/${task_id}`, {
          headers: { token: `Bearer ${token}` },
        })
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDuedate(response.data.dueDate);
          setPriority(response.data.priority);
          setStatus(response.data.status);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/api/v1/tasks/${task_id}`,
        {
          title: title,
          description: description,
          dueDate: duedate,
          priority: priority,
          status: status,
        },
        { headers: { token: `Bearer ${token}` } }
      );
      dispatch(toggleEdit());
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="col-12 col-md-8 mx-auto">
      <form
        className="TodoForm mt-4 p-4 rounded shadow-sm"
        onSubmit={handleUpdate}
      >
        <div>
          <h2 className="mb-4">Edit a new task</h2>
        </div>
        <div className="mb-3 d-flex flex-column col-12 col-sm-8 mx-auto">
          <label htmlFor="taskTitle">
            Title <span style={{ colQor: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="taskTitle"
            className="todo-input"
            placeholder={title ? "" : "Input your task"}
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <hr />
        <div className="d-flex flex-column col-12 col-sm-8 mx-auto">
          <label>(Optional)</label>
          <label>Description</label>
          <input
            type="text"
            className="todo-input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="dueDate" className="mt-3">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="todo-input2 form-control"
            placeholder="Input Due Date"
            value={duedate}
            onChange={(e) => setDuedate(e.target.value)}
          />

          <label>Priority:</label>
          <div className="form-control todo-input2 d-flex flex-wrap justify-content-around">
            <div className="d-flex mx-auto">
              <input
                type="radio"
                id="urgentPriority"
                className="radio my-auto"
                name="priority"
                value="Urgent"
                onChange={(e) => setPriority(e.target.value)}
              />{" "}
              <label htmlFor="urgentPriority" className="my-auto">
                Urgent
              </label>
            </div>
            <div className="d-flex mx-auto">
              <input
                type="radio"
                id="highPriority"
                className="radio my-auto"
                name="priority"
                value="High"
                onChange={(e) => setPriority(e.target.value)}
              />
              <label htmlFor="highPriority" className="my-auto">
                High
              </label>
            </div>

            <div className="d-flex mx-auto">
              <input
                type="radio"
                id="mediumPriority"
                className="radio"
                name="priority"
                value="Medium"
                onChange={(e) => setPriority(e.target.value)}
              />
              <label htmlFor="mediumPriority">Medium</label>
            </div>
            <div className="d-flex mx-auto">
              <input
                type="radio"
                id="lowPriority"
                className="radio"
                name="priority"
                value="Low"
                onChange={(e) => setPriority(e.target.value)}
                defaultChecked
              />
              <label htmlFor="lowPriority">Low</label>
            </div>
          </div>

          <label>Status:</label>
          <div className="form-control todo-input2 d-flex flex-wrap justify-content-around">
            <div className="d-flex mx-auto">
              <input
                type="radio"
                className="radio"
                id="completedStatus"
                name="status"
                value="Completed"
                onChange={(e) => setStatus(e.target.value)}
              />{" "}
              <label htmlFor="completedStatus">Completed</label>
            </div>
            <div className="d-flex mx-auto">
              <input
                type="radio"
                className="radio"
                id="ongoingStatus"
                name="status"
                value="Ongoing"
                onChange={(e) => setStatus(e.target.value)}
              />{" "}
              <label htmlFor="ongoingStatus">Ongoing</label>
            </div>
            <div className="d-flex mx-auto">
              <input
                type="radio"
                className="radio"
                id="pendingStatus"
                name="status"
                value="Not Started"
                onChange={(e) => setStatus(e.target.value)}
                defaultChecked
              />{" "}
              <label htmlFor="pendingStatus">Not Started</label>
            </div>
          </div>
        </div>
        {error && (
          <div className="col-12 col-sm-8 mx-auto">
            <label className="text-danger">{error}</label>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
