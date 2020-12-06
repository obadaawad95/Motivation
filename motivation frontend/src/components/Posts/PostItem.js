import React, { useState, useContext } from "react";
import { Avatar } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { useRowFlexStyles } from "@mui-treasury/styles/flex/row";
import AllComments from "../Comments/AllComments";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { AuthContext } from "../../states/contexts/AuthContext";
import "./PostStyle.css";

const PostItem = ({
  id,
  name,
  text,
  pimg,
  datee,
  creator,
  count,
  className1,
  className2,
}) => {
  const auth = useContext(AuthContext);
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();
  const [likes, setLikes] = useState(false);

  const LikesHanlder = () => {
    setLikes(!likes);
  };
  return (
    <li className={`post-container ${className1}`}>
      <div className={`post-card  ${className2}`}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Avatar
            className="post-avatar"
            src={`http://localhost:5000/${pimg}`}
            alt={id}
          />
          <h3 className="post-header">{name} </h3>
          <div className={flexStyles.rightChild} style={{ marginTop: "10px" }}>
            {datee}
          </div>
        </div>
        <p className="post-body">{text}</p>
        <hr />

        <div style={{ display: "flex", justifyContent: "center" }}>
          {auth.isLoggedIn && (
            <button
              onClick={LikesHanlder}
              className={labelStyles.link}
              style={{ outline: "none" }}
            >
              <Favorite
                className={labelStyles.icon}
                style={{ color: likes ? "#B93946" : null, outline: "none" }}
              />
            </button>
          )}

          {auth.userId === creator && <EditPost id={id} />}
          {auth.userId === creator && <DeletePost id={id} />}
        </div>

        <AllComments id={id} count={count} />
      </div>
    </li>
  );
};
export default PostItem;
