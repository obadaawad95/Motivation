import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Article from "../components/Article";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import { ArticleContext } from "../states/contexts/ArticleContext";
import { CategoryContext } from "../states/contexts/CategoryContext";
const AllArticles = () => {
  const { isLoading, error, clearError, getArticles, Articles } = useContext(
    ArticleContext
  );
  const { Cats, getcategory } = useContext(CategoryContext);
  useEffect(() => {
    getArticles();
    getcategory();
  }, []);

  if (Articles.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h1> Articles</h1>
        <h4>There are no Articles</h4>

        <Link to="addarticle">
          <button className="admin-button">Add an article</button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
  return (
    <>
      <h1> Articles</h1>

      <Link to="addarticle">
        <button className="admin-button">Add an article</button>
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
                <p>Category</p>
              </th>
              <th>
                <p>Title</p>
              </th>
              <th>
                <p>Undertitle</p>
              </th>
              <th>
                <p>Description</p>
              </th>
              <th>
                <p>Image </p>
              </th>
              <th>...</th>
            </tr>

            {Articles.map((p) => {
              return (
                <Article
                  id={p._id}
                  key={p.id}
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

export default AllArticles;
