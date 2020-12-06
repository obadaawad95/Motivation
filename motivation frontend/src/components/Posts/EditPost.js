import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import EditIcon from "@material-ui/icons/Edit";
import { PostContext } from "../../states/contexts/PostContext";
import { AuthContext } from "../../states/contexts/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./PostStyle.css";
const ModalCenter = (props) => {
  const { editPost, Posts, isLoading } = useContext(PostContext);
  const [text, setText] = useState("");
  const tempPost = Posts.find((post) => post._id === props.id);
  const auth = useContext(AuthContext);

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const EditedPost = {
      id: props.id,
      creator: auth.userId,
      name: auth.userName,
      text,
    };
    editPost(EditedPost);
  };
  const handleChangee = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (tempPost) {
      setText(tempPost.text);
    } else {
      setText("");
    }
  }, [tempPost]);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal__header">
        Edit Your Post Here..
      </Modal.Header>
      <div className="center">
        {isLoading && <CircularProgress color="inherit" />}
      </div>
      {!isLoading && Posts && (
        <form onSubmit={handleSubmitt}>
          <Modal.Body className="modal__content">
            <textarea
              onChange={handleChangee}
              value={text}
              type="post"
              label="post"
              placeholder="Write your post  "
              required
              cols={52}
              rows={5}
              style={{ fontSize: "20px" }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer className="modal__footer">
            <button
              type="button"
              className="post-button"
              onClick={props.onHide}
            >
              Close
            </button>
            <button
              className="post-button"
              type="submit"
              onClick={props.onClose}
            >
              Edit Post
            </button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};
const EditPost = ({ id }) => {
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
        id={id}
        onClose={() => setModalShow(false)}
      />
    </div>
  );
};
export default EditPost;
