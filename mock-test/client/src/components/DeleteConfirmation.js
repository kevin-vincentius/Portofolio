import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleDelete } from "../redux/taskSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../axiosInstance";

const DeleteConfirmation = () => {
  const dispatch = useDispatch();
  const task_id = useSelector((state) => state.task.id);
  const token = useSelector((state) => state.auth.token);

  const handleDelete = async () => {
    try {
      await axiosInstance
        .delete(`/api/v1/tasks/${task_id}`, {
          headers: { token: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          closeModal();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    dispatch(toggleDelete());
  };

  return (
    <Modal show centered>
      <Modal.Header className="justify-content-end">
        <Modal.Title>
          <FontAwesomeIcon icon={faTimes} onClick={closeModal} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confirm delete?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
