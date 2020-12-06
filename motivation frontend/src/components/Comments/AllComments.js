import React, { useState, useEffect, useContext } from "react";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import ModeComment from "@material-ui/icons/ModeComment";
import Collapse from "react-bootstrap/Collapse";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CommentContext } from "../../states/contexts/CommentContext";
import Addcomment from "./Addcomment";
import Commentslist from "./Commentslist";
import ErrModal from "../ErrModal/ErrModal";
import "./PostStyle.css";

const ALlComments = ({ id, count }) => {
  const {
    getComments,
    error,
    isLoading,
    clearError,
    Comments,
    refresh,
  } = useContext(CommentContext);

  const [open, setOpen] = useState(false);
  const labelStyles = useLabelIconStyles({ linked: true });

  useEffect(() => {
    getComments();
  }, [refresh]);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      {isLoading && <CircularProgress color="inherit" />}

      <ErrModal error={error} clearError={clearError} />

      {!isLoading && Comments && (
        <div>
          <button
            onClick={handleOpen}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className={labelStyles.link}
            style={{ outline: "none" }}
          >
            <ModeComment className={labelStyles.icon} /> {count}
          </button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <div className="center">
                <ul>
                  <Commentslist loadedComments={Comments} id={id} />
                  <Addcomment id={id} />
                </ul>
              </div>
            </div>
          </Collapse>
        </div>
      )}
    </>
  );
};
export default ALlComments;
