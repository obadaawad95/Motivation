import React, { useEffect, useContext } from "react";
import Book from "../components/Book";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import { BooksContext } from "../states/contexts/BooksContext";
import { Link } from "react-router-dom";
import { CategoryContext } from "../states/contexts/CategoryContext";

const AllBooks = () => {
  const { isLoading, error, clearError, getBooks, Books } = useContext(
    BooksContext
  );
  const { Cats, getcategory } = useContext(CategoryContext);

  useEffect(() => {
    getBooks();
    getcategory();
  }, []);

  if (Books.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h1>Books </h1>
        <h4>There are no Books</h4>
        <Link to="addbook">
          <button className="admin-button">Add a book</button>
        </Link>
        <br />
        <br />
      </div>
    );
  }

  return (
    <>
      <h1>Books </h1>
      <Link to="addbook">
        <button className="admin-button">Add a book</button>
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
                <p>Description</p>
              </th>
              <th>
                <p> Image</p>
              </th>
              <th>...</th>
            </tr>
            {Books.map((p) => {
              return (
                <Book
                  id={p._id}
                  key={p._id}
                  type={Cats.map((c) => (c.id === p.thecat ? c.type : null))}
                  title={p.title}
                  undertitle={p.undertitle}
                  description={p.description}
                  image={p.image}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllBooks;
