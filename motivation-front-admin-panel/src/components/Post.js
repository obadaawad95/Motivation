import React from "react";
import DeletePost from "./DeletePost";
const Post = ({ id, name, text }) => {
  return (
    <tr>
      <td>
        <p> {name} </p>
      </td>
      <td>
        <p> {id} </p>
      </td>
      <td>
        <p> {text} </p>
      </td>
      <td>
        <div>
          <DeletePost id={id} />
        </div>
      </td>
    </tr>
  );
};

export default Post;
