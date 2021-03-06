import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import DeleteIcon from "@material-ui/icons/Delete";
import { CommentContext } from "../../states/contexts/CommentContext";
import "./PostStyle.css";
const ModalCenter = (props) => {
  const { removeComment } = useContext(CommentContext);
  const DeleteHandler = () => {
    removeComment(props.cid);
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal__header">
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__content">
        <p>
          Do you want to proceed and delete this Comment? Please note that it
          can't be undone thereafter.
        </p>
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        <button className="post-button" onClick={props.onHide}>
          Cancel
        </button>
        <form onSubmit={DeleteHandler}>
          <button className="post-button" type="submit" onClick={props.onHide}>
            Delete
          </button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};
const DeleteComment = ({ cid }) => {
  const [modalShow, setModalShow] = useState(false);
  const labelStyles = useLabelIconStyles({ linked: true });
  const showModalHandler = () => {
    setModalShow(true);
  };
  return (
    <div>
      <button
        onClick={showModalHandler}
        className={labelStyles.link}
        style={{ outline: "none" }}
      >
        <DeleteIcon className={labelStyles.icon} />
        Delete
      </button>

      <ModalCenter
        show={modalShow}
        onHide={() => setModalShow(false)}
        cid={cid}
      />
    </div>
  );
};
export default DeleteComment;
