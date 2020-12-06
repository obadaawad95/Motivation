import React, { useEffect, useState, useContext, useReducer } from "react";
import ErrModal from "../components/ErrModal/ErrModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../states/contexts/CategoryContext";

import "./AddBook.css";
import { BooksContext } from "../states/contexts/BooksContext";

const addBookReducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
const AddBook = () => {
  const [img, setImg] = useState();
  const { addBook, error, isLoading, clearError } = useContext(BooksContext);
  const { Cats, getcategory } = useContext(CategoryContext);

  const [state, dispatch] = useReducer(addBookReducer, {
    thecat: "",
    title: "",
    undertitle: "",
    description: "",
  });

  const history = useHistory();
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const NewBook = {
      thecat: state.thecat,
      title: state.title,
      undertitle: state.undertitle,
      description: state.description,
      image: img,
    };
    addBook(NewBook);
    history.push("/books");
  };
  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.target.value });
  };
  const imghandler = (e) => {
    setImg(e);
    return e;
  };
  useEffect(() => {
    getcategory();
  }, []);
  return (
    <>
      <ErrModal error={error} clearError={clearError} />
      {isLoading && <CircularProgress color="inherit" />}
      {!isLoading && (
        <div className="addbook-container">
          <div className="addbook-card">
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  marginBottom: "20px",
                  color: "#B93946",
                  fontWeight: "bolder",
                }}
              >
                <h1> Add a book</h1>
              </div>
              <div>
                <select
                  id="Categories"
                  name="Categories"
                  value={state.thecat}
                  onChange={updateFieldValue("thecat")}
                  className="admin-input"
                >
                  <option> ...</option>
                  {Cats.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.type}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="Tile"
                  placeholder="Title"
                  id="Title"
                  className="admin-input"
                  onChange={updateFieldValue("title")}
                  value={state.title}
                />
                <input
                  type="UnderTitle"
                  placeholder="UnderTitle"
                  id="UnderTitle"
                  className="admin-input"
                  onChange={updateFieldValue("undertitle")}
                  value={state.undertitle}
                />
                <ImageUpload id="image" center onInput={imghandler} />

                <textarea
                  onChange={updateFieldValue("description")}
                  value={state.description}
                  placeholder="Description"
                  required
                  cols={52}
                  rows={20}
                  style={{
                    backgroundColor: "#C8C8C8",
                    border: "1px solid ",
                    width: "100%",
                    borderColor: "transparent",
                    fontSize: 20,
                  }}
                ></textarea>
              </div>
              <button className="admin-button" type="submit">
                ADD BOOK
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBook;
