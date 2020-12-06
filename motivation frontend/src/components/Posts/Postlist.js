import React from "react";
import PostItem from "./PostItem";

const Postlist = ({ loadedPosts }) => {
  if (!loadedPosts.length) {
    return (
      <li className="post-container">
        <div className="center">
          <div className="post-card">
            <h2>No Posts found.</h2>
          </div>
        </div>
      </li>
    );
  }
  return (
    <div>
      {loadedPosts.map((p) => {
        return (
          <PostItem
            id={p._id}
            key={p._id}
            name={p.name}
            text={p.text}
            pimg={p.pimg}
            creator={p.creator}
            datee={p.datee}
            count={p.comments ? p.comments.length : null}
          />
        );
      })}
    </div>
  );
};

export default Postlist;
