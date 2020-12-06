import React, { useState, useContext } from "react";
import { PostContext } from "../../states/contexts/PostContext";
import { AuthContext } from "../../states/contexts/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../ErrModal/ErrModal";
import "./PostStyle.css";
const Addpost = () => {
  const auth = useContext(AuthContext);
  const { addPost, clearError, isLoading, error } = useContext(PostContext);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NewPost = {
      creator: auth.userId,
      name: auth.userName,
      text,
      pimg: auth.userImg,
    };
    addPost(NewPost);
    setText("");
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <ErrModal error={error} clearError={clearError} />
      {auth.isLoggedIn && !isLoading && (
        <li className="post-container">
          <div className="post-card">
            <p style={{ fontSize: "26px", fontWeight: "700px" }}>
              Any problems you are facing ?
            </p>
            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
              <textarea
                onChange={handleChange}
                value={text}
                type="text"
                label="Add Post..."
                placeholder="Add Post..."
                required
              />
              <button type="submit" className="addpost-button">
                Add Post
              </button>
            </form>
          </div>
        </li>
      )}

      {isLoading && <CircularProgress color="inherit" />}
    </>
  );
};
export default Addpost;
