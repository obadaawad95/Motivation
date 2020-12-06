import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import DeleteIcon from "@material-ui/icons/Delete";
import { ArticleContext } from "../states/contexts/ArticleContext";
const ModalCenter = (props) => {
  const { removeArticle } = useContext(ArticleContext);
  const DeleteHandler = () => {
    removeArticle(props.id);
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
          Do you want to proceed and delete this Article? Please note that it
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
const DeleteArticle = ({ id }) => {
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
        id={id}
      />
    </div>
  );
};
export default DeleteArticle;
