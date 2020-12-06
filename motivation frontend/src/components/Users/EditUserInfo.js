import React, { useState, useContext, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { UserContext } from "../../states/contexts/UserContext";
import { AuthContext } from "../../states/contexts/AuthContext";
import DeleteUser from "./DeleteUser";
import "./EditUserInfo.css";

const EditUserInfo = () => {
  const auth = useContext(AuthContext);
  const { Users, editUserInfo } = useContext(UserContext);
  const tempUser = Users.find((user) => user._id === auth.userId);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const [school, setSchool] = useState("");
  const [university, setUniversity] = useState("");
  const [aboutme, setAboutme] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const EditedInfo = {
      id: auth.userId,
      name,
      location,
      job,
      school,
      university,
      aboutme,
    };
    editUserInfo(EditedInfo);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (tempUser) {
      setName(tempUser.name);
      setLocation(tempUser.location);
      setJob(tempUser.job);
      setSchool(tempUser.school);
      setUniversity(tempUser.uni);
      setAboutme(tempUser.aboutme);
    } else {
      setName("");
      setLocation("");
      setJob("");
      setSchool("");
      setUniversity("");
      setAboutme("");
    }
  }, [tempUser]);
  return (
    <div>
      <button type="button" onClick={handleOpen} className="post-button">
        Edit Profile
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
            <form onSubmit={handleSubmit}>
              <div className="paperUserInfo">
                <div>
                  <h4 id="transition-modal-title"> Edit Profile</h4>
                </div>

                <div>
                  <label className="login-label">Full Name </label>
                  <input
                    type="name"
                    placeholder="Full Name"
                    id="FullName"
                    className="login-input"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <label className="login-label">Location </label>
                  <input
                    type="location"
                    placeholder="Location"
                    id="location"
                    className="login-input"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                  <label className="login-label">Job </label>
                  <input
                    type="job"
                    placeholder="job"
                    id="job"
                    className="login-input"
                    onChange={(e) => setJob(e.target.value)}
                    value={job}
                  />
                  <label className="login-label">School </label>
                  <input
                    type="school"
                    placeholder="school"
                    id="school"
                    className="login-input"
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                  />
                  <label className="login-label">University </label>
                  <input
                    type="university"
                    placeholder="university"
                    id="university"
                    className="login-input"
                    onChange={(e) => setUniversity(e.target.value)}
                    value={university}
                  />

                  <textarea
                    onChange={(e) => {
                      setAboutme(e.target.value);
                    }}
                    value={aboutme}
                    type="Aboutme"
                    placeholder="Write what you want others to know about you"
                    required
                    cols={52}
                    rows={5}
                    style={{
                      marginTop: "20px",
                      backgroundColor: "transparent",
                      border: "1px solid ",
                    }}
                  ></textarea>
                </div>
                <div className="modalUserInfoFooter">
                  <DeleteUser />
                  <button className="EditUserInfoBtn" type="submit">
                    Confirm edit
                  </button>
                  <button
                    type="button"
                    className="EditUserInfoBtn"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default EditUserInfo;
