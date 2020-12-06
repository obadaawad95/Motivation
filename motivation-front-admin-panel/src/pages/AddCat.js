import React, { useState, useContext, useReducer } from "react";
import { CategoryContext } from "../states/contexts/CategoryContext";
import ErrModal from "../components/ErrModal/ErrModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import ImageUpload from "../components/ImageUpload/ImageUpload";

import "./AddArticle.css";

const addCatReducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
const AddCat = () => {
  const [img, setImg] = useState();

  const { addcategory, error, isLoading, clearError } = useContext(
    CategoryContext
  );
  const [state, dispatch] = useReducer(addCatReducer, {
    type: "",
  });
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const NewCat = {
      type: state.type,
      image: img,
    };
    addcategory(NewCat);
    history.push("/cats");
  };
  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.target.value });
  };
  const imghandler = (e) => {
    setImg(e);
    return e;
  };
  return (
    <>
      <ErrModal error={error} clearError={clearError} />
      {isLoading && <CircularProgress color="inherit" />}
      {!isLoading && (
        <div className="addarticle-container">
          <div className="addarticle-card">
            <form onSubmit={handleSubmit}>
              <div className="paperUserInfo">
                <div
                  style={{
                    marginBottom: "20px",
                    color: "#B93946",
                    fontWeight: "bolder",
                  }}
                >
                  <h1> Add a Category</h1>
                </div>
                <div>
                  <input
                    type="type"
                    placeholder="Type of Category"
                    id="type"
                    className="admin-input"
                    onChange={updateFieldValue("type")}
                    value={state.type}
                  />
                </div>
                <ImageUpload id="image" center onInput={imghandler} />

                <button className="admin-button" type="submit">
                  ADD CATEGORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCat;
