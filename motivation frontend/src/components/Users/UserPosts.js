import React, { useState, useContext, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostItem from "../Posts/PostItem";
import ErrModal from "../ErrModal/ErrModal";
import { PostContext } from "../../states/contexts/PostContext";
import { AuthContext } from "../../states/contexts/AuthContext";
import "./UserPosts.css";

const UserPosts = () => {
  const { getPosts, error, clearError, Posts, refresh, isLoading } = useContext(
    PostContext
  );
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getPosts();
  }, [refresh]);

  const handleOpen = () => {
    setOpen(!open);
  };
  let UserPostsNum = Posts.filter((p) => p.creator === auth.userId);

  return (
    <>
      <ErrModal error={error} clearError={clearError} />
      {isLoading && <CircularProgress color="inherit" />}

      {!isLoading && Posts && (
        <div>
          <button
            onClick={handleOpen}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            style={{ outline: "none", backgroundColor: "transparent" }}
          >
            View posts
          </button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <div className="center">
                <ul>
                  {UserPostsNum.length === 0 ? (
                    <div className="center UserPost-container">
                      <div className="UserPost-card">
                        <h4> This user does not have any posts yet..</h4>
                      </div>
                    </div>
                  ) : (
                    Posts.map((p) =>
                      p.creator === auth.userId ? (
                        <PostItem
                          id={p._id}
                          key={p._id}
                          name={p.name}
                          text={p.text}
                          pimg={p.pimg}
                          creator={p.creator}
                          datee={p.datee}
                          count={p.comments ? p.comments.length : null}
                          className1={`UserPost-container`}
                          className2={`UserPost-card `}
                        />
                      ) : null
                    )
                  )}
                </ul>
              </div>
            </div>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default UserPosts;
