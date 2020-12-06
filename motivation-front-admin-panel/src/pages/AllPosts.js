import React, { useContext, useEffect } from "react";
import Post from "../components/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PostContext } from "../states/contexts/PostContext";
import ErrModal from "../components/ErrModal/ErrModal";

const Allposts = () => {
  const { getPosts, isLoading, error, Posts, clearError } = useContext(
    PostContext
  );
  useEffect(() => {
    getPosts();
  }, []);

  if (Posts.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h4>There are no Posts</h4>
      </div>
    );
  }
  return (
    <>
      <h1>Posts</h1>
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
                <p>Post</p>
              </th>
              <th>...</th>
            </tr>
            {Posts.map((p) => {
              return (
                <Post id={p._id} key={p._id} name={p.name} text={p.text} />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Allposts;
