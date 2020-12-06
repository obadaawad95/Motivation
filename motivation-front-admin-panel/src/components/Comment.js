import React from "react";
import DeleteComment from "./DeleteComment";
const Comment = ({ cid, name, text, email }) => {
  return (
    <tr>
      <td>
        <p> {name} </p>
      </td>
      <td>
        <p> {cid} </p>
      </td>
      <td>
        <p> {text}</p>
      </td>
      <td>
        <DeleteComment cid={cid} />
      </td>
    </tr>
  );
};

export default Comment;
