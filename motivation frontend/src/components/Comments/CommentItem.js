import React, { useContext, useState } from "react";
import Favorite from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import EditCommont from "./EditComment";
import DeleteComment from "./DeleteComment";
import "./PostStyle.css";
import { AuthContext } from "../../states/contexts/AuthContext";
const CommentsItem = ({ text, name, pimg, uid, cid, creator }) => {
  const auth = useContext(AuthContext);
  const labelStyles = useLabelIconStyles({ linked: true });
  const [likes, setLikes] = useState(false);

  const LikesHanlder = () => {
    setLikes(!likes);
  };
  return (
    <li>
      <hr />
      <div style={{ display: "flex" }}>
        <Avatar
          className="post-avatar"
          src={`http://localhost:5000/${pimg}`}
          alt={uid}
        />
        <h3 className="post-header"> {name} </h3>
      </div>
      <div className="comment-card">
        <span className="post-body">{text}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {auth.isLoggedIn && (
          <button
            className={labelStyles.link}
            onClick={LikesHanlder}
            style={{ outline: "none" }}
          >
            <Favorite
              className={labelStyles.icon}
              style={{ color: likes ? "#B93946" : null }}
            />
          </button>
        )}

        {auth.userId === creator && <EditCommont cid={cid} />}
        {auth.userId === creator && <DeleteComment cid={cid} />}
      </div>
    </li>
  );
};
export default CommentsItem;
