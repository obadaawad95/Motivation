import React, { useContext, useEffect } from "react";
import Video from "../components/video";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import { VideoContext } from "../states/contexts/VideoContext";
import { CategoryContext } from "../states/contexts/CategoryContext";

const AllVideos = () => {
  const { isLoading, error, clearError, getvideos, Videos } = useContext(
    VideoContext
  );
  const { Cats, getcategory } = useContext(CategoryContext);

  useEffect(() => {
    getvideos();
    getcategory();
  }, []);

  if (Videos.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h1>Videos </h1>

        <h4>There are no Videos</h4>

        <Link to="addvideo">
          <button className="admin-button">Add a video</button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
  return (
    <>
      <ErrModal clearError={clearError} error={error} />

      <h1>Videos </h1>
      <Link to="addvideo">
        <button className="admin-button">Add a video</button>
      </Link>
      <br />
      <br />
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
                <p>Id</p>
              </th>
              <th>
                <p>Category</p>
              </th>
              <th>
                <p>Title</p>
              </th>
              <th>
                <p>UnderTitle</p>
              </th>
              <th>
                <p>Desciption</p>
              </th>
              <th>
                <p> image</p>
              </th>
              <th>...</th>
            </tr>
            {Videos.map((v) => {
              return (
                <Video
                  id={v._id}
                  key={v.id}
                  type={Cats.map((c) => (c.id === v.thecat ? c.type : null))}
                  title={v.title}
                  undertitle={v.undertitle}
                  description={v.description}
                  image={v.image}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllVideos;
