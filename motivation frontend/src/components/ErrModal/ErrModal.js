import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const ErrModal = ({ clearError, error }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={error ? true : false}
      onClose={clearError}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade
        in={error ? true : false}
        style={{
          backgroundColor: "#DDB091",
          padding: "100px",
          outline: "0",
          borderRadius: "15px",
          boxShadow: "0 4px 11px rgba(0, 0, 0, 0.26)",
          color: "#B93946",
          justifyContent: "center",
        }}
      >
        <div>
          <h2 style={{ textAlign: "center" }} id="transition-modal-title">
            An Error has occured!!
          </h2>
          <div id="transition-modal-description">{error} </div>

          <button className="post-button " onClick={clearError}>
            OKAY
          </button>
        </div>
      </Fade>
    </Modal>
  );
};

export default ErrModal;
