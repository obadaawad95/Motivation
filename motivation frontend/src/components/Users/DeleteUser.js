import React, { useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { UserContext } from "../../states/contexts/UserContext";
import { AuthContext } from "../../states/contexts/AuthContext";
const DeleteUser = () => {
  const { deleteUser } = useContext(UserContext);
  const { logout, userId } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const userDeleteHandler = async () => {
    await deleteUser(userId);
    await logout();
  };
  return (
    <div>
      <button type="button" onClick={handleOpen} className="EditUserInfoBtn">
        Deactivate account
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modalUserInfo"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="MyProfile-container">
            <div className="paperUserInfo">
              <div>
                <h2 id="transition-modal-title"> WARINING!!!</h2>
                <h5>Once you confirm User delete there is no going back!!</h5>
              </div>
              <form onSubmit={userDeleteHandler}>
                <div className="modalUserInfoFooter">
                  <button
                    type="button"
                    className="EditUserInfoBtn"
                    onClick={handleClose}
                  >
                    GO BACK
                  </button>
                  <button className="EditUserInfoBtn" type="submit">
                    Confirm DELETE!!!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteUser;
