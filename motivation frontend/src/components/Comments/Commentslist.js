import React from "react";
import CommentItem from "./CommentItem";

const Commentslist = ({ loadedComments, id }) => {
  let CommentsNum = loadedComments.filter((n) => n.thepost === id);

  if (CommentsNum.length === 0) {
    return (
      <div className="center">
        <div className="comment-card">
          <h4>Be the first to comment .</h4>
        </div>
      </div>
    );
  }

  return loadedComments.map((c) =>
    c.thepost === id ? (
      <CommentItem
        text={c.text}
        pimg={c.cimg}
        name={c.name}
        key={c._id}
        cid={c._id}
        creator={c.creator}
      />
    ) : null
  );
};

export default Commentslist;
