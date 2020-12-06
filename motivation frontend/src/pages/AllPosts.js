import React, { useEffect, useContext } from "react";
import AddPost from "../components/Posts/Addpost";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PostContext } from "../states/contexts/PostContext";
import Postlist from "../components/Posts/Postlist";
import ErrModal from "../components/ErrModal/ErrModal";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./AllPosts";
const Posts = () => {
  const { getPosts, isLoading, error, Posts, clearError, refresh } = useContext(
    PostContext
  );
  useEffect(() => {
    getPosts();
  }, [refresh]);
  return (
    <>
      <div className="AAA">
        <Header bool={true} num={-1} />
        <ErrModal clearError={clearError} error={error} />
        {isLoading && (
          <div className="center" style={{ marginTop: "500px" }}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {!isLoading && (
          <div className="center">
            <ul>
              <AddPost />
              <Postlist loadedPosts={Posts} />
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Posts;
