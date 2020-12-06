import React from "react";
import DeleteArticle from "./DeleteArticle";
import EditArticle from "./EditArticle";
const Article = ({ id, type, title, undertitle, description, image }) => {
  return (
    <tr>
      <td>
        <p> {id} </p>
      </td>
      <td>
        <p> {type} </p>
      </td>
      <td>
        <p> {title}</p>
      </td>
      <td>
        <p>{undertitle} </p>
      </td>
      <td>
        <p> {description} </p>
      </td>
      <td>
        <img
          alt={title}
          src={`http://localhost:5000/${image}`}
          // className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
          style={{ maxWidth: "150px" }}
        />
      </td>
      <td>
        <DeleteArticle id={id} />
        <EditArticle id={id} />
      </td>
    </tr>
  );
};

export default Article;
