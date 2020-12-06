import React, { useContext, useEffect } from "react";
import Comment from "../components/Comment";
import { CommentContext } from "../states/contexts/CommentContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";

const AllComments = () => {
  const {
    getComments,
    error,
    isLoading,
    clearError,
    Comments,
    refresh,
  } = useContext(CommentContext);

  useEffect(() => {
    getComments();
  }, [refresh]);
  if (Comments.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h4>There are no Comments</h4>
      </div>
    );
  }
  return (
    <>
      <h1>Comments </h1>
      <ErrModal clearError={clearError} error={error} />
      {isLoading && (
        <div className="center">
          <CircularProgress color="inherit" />
        </div>
      )}
      {!isLoading && (
        <table>
          <tbody>
            <tr style={{ backgroundColor: "#DDB091" }}>
              <th>
                <p>UserName</p>
              </th>
              <th>
                <p>Id</p>
              </th>
              <th>
                <p>Comment</p>
              </th>
              <th>...</th>
            </tr>
            {Comments.map((c) => (
              <Comment
                text={c.text}
                name={c.name}
                key={c._id}
                cid={c._id}
                email={c.email}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllComments;
