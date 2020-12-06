import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import EditIcon from "@material-ui/icons/Edit";
import { CommentContext } from "../../states/contexts/CommentContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../../states/contexts/AuthContext";
import "./PostStyle.css";
const ModalCenter = (props) => {
  const { editComment, Comments, isLoading } = useContext(CommentContext);
  const [text, setText] = useState("");
  const tempComment = Comments.find((comment) => comment._id === props.cid);
  const auth = useContext(AuthContext);

  const handleSubmitt = (e) => {
    e.preventDefault();

    const EditedComment = {
      id: props.cid,
      thepost: tempComment.thepost,
      creator: auth.userId,
      name: auth.userName,
      text,
    };
    editComment(EditedComment);
  };
  const handleChangee = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (tempComment) {
      setText(tempComment.text);
    } else {
      setText("");
    }
  }, [tempComment]);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal__header">Edit Your Comment</Modal.Header>
      <div className="center">
        {isLoading && <CircularProgress color="inherit" />}
      </div>
      {!isLoading && Comments && (
        <form onSubmit={handleSubmitt}>
          <Modal.Body className="modal__content">
            <textarea
              onChange={handleChangee}
              value={text}
              type="comment"
              label="comment"
              placeholder="Write your comment"
              required
              cols={30}
              rows={5}
              style={{ fontSize: "20px" }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer className="modal__footer">
            <button
              className="post-button"
              type="button"
              onClick={props.onHide}
            >
              Close
            </button>
            <button
              className="post-button"
              type="submit"
              onClick={props.onClose}
            >
              Edit Comment
            </button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};
const EditComment = ({ cid }) => {
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
        <EditIcon className={labelStyles.icon} />
        Edit
      </button>
      <ModalCenter
        show={modalShow}
        onHide={() => setModalShow(false)}
        cid={cid}
        onClose={() => setModalShow(false)}
      />
    </div>
  );
};
export default EditComment;
