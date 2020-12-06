import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Cat from "../components/Cat";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import { CategoryContext } from "../states/contexts/CategoryContext";
const AllCat = () => {
  const { isLoading, error, clearError, getcategory, Cats } = useContext(
    CategoryContext
  );
  useEffect(() => {
    getcategory();
  }, []);

  if (Cats.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h1> Categories</h1>
        <h4>There are no Categories</h4>

        <Link to="addcat">
          <button className="admin-button">Add a Categories</button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
  return (
    <>
      <h1> Categories</h1>

      <Link to="addcat">
        <button className="admin-button">Add a Categories</button>
      </Link>
      <br />
      <br />
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
                <p>id</p>
              </th>
              <th>
                <p>Type</p>
              </th>
              <th>...</th>
            </tr>
            {Cats.map((c) => {
              return <Cat id={c._id} key={c._id} type={c.type} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllCat;
