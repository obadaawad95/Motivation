import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../states/contexts/AuthContext";
import { UserContext } from "../states/contexts/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import MyProfileItem from "../components/Users/MyProfileItem";

const Myprofile = () => {
  const auth = useContext(AuthContext);
  const { getUser, Users, isLoading, clearError, error, refresh } = useContext(
    UserContext
  );
  let dob = new Date(auth.age);
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);
  var agee = Math.abs(age_dt.getUTCFullYear() - 1970);

  useEffect(() => {
    getUser();
  }, [refresh]);

  return (
    <>
      <div className="AAA">
        <Header bool={true} num={-1} />
        <ErrModal clearError={clearError} error={error} />
        {isLoading && (
          <div className="center" style={{ marginTop: "500px" }}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {!isLoading &&
          Users.map((u) =>
            u._id === auth.userId ? (
              <MyProfileItem
                key={u._id}
                UserName={u.name}
                PostsNum={u.posts.length}
                CommentsNum={u.comments.length}
                AboutMe={u.aboutme}
                Job={u.job}
                Location={u.location}
                School={u.school}
                Uni={u.uni}
                Birth={u.age}
                Age={agee}
                Img={auth.userImg}
              />
            ) : null
          )}
      </div>

      <Footer />
    </>
  );
};

export default Myprofile;
