import React, { useContext, useState } from "react";
import { CommentContext } from "../../states/contexts/CommentContext";
import { AuthContext } from "../../states/contexts/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../ErrModal/ErrModal";
import "./PostStyle.css";

const Addcomment = ({ id }) => {
  const auth = useContext(AuthContext);
  const { addComment, clearError, error, isLoading } = useContext(
    CommentContext
  );
  const [text, setText] = useState("");
  const handleSubmitt = async (e) => {
    e.preventDefault();
    const NewComment = {
      thepost: id,
      creator: auth.userId,
      name: auth.userName,
      text,
      cimg: auth.userImg,
    };
    addComment(NewComment);
    setText("");
  };
  const handleChangee = (e) => {
    setText(e.target.value);
  };
  return (
    auth.isLoggedIn &&
    !isLoading && (
      <li>
        <ErrModal clearError={clearError} error={error} />

        <hr />
        <form onSubmit={handleSubmitt} style={{ position: "relative" }}>
          <textarea
            onChange={handleChangee}
            value={text}
            type="text"
            label="comment"
            placeholder="Write your comment"
            required
          />
          <button type="submit" className="addpost-button">
            Add Comment
          </button>
        </form>
        {isLoading && <CircularProgress color="inherit" />}
      </li>
    )
  );
};
export default Addcomment;
