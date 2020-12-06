import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import { AuthContext } from "../states/contexts/AuthContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Auth.css";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [datee, setDate] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [img, setImg] = useState();
  useEffect(() => {
    if (isLoginMode) {
      if (username.trim() && password.trim()) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    } else if (username.trim() && password.trim() && fullname.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password, fullname, isLoginMode]);
  const handleLogin = async () => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: username,
            password: password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.name,
          responseData.image,
          responseData.token,
          responseData.age
        );
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", username);
        formData.append("name", fullname);
        formData.append("password", password);
        formData.append("image", img);
        formData.append("age", datee);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        // auth.login(
        //   responseData.userId,
        //   responseData.name,
        //   responseData.image,
        //   responseData.token,
        //   responseData.age
        // );
      } catch (err) {}
    }
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    handleLogin();
  };

  const imghandler = (e) => {
    setImg(e);
    return e;
  };

  return (
    <React.Fragment>
      <Header bool={true} num={-1} />
      <div className="login-wall-image">
        <div className="AAA ">
          <ErrModal error={error} clearError={clearError} />
          <div className="center ">
            <div className="login-card ">
              {isLoading && <CircularProgress color="inherit" />}

              {!isLoading && (
                <div>
                  <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                      <ImageUpload id="image" center onInput={imghandler} />
                    )}
                    <h1 className="headerLI">
                      {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </h1>
                    <hr />
                    {!isLoginMode && (
                      <label className="login-label">Full Name </label>
                    )}
                    {!isLoginMode && (
                      <input
                        type="text"
                        placeholder=""
                        id="FullName"
                        className="login-input"
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        required
                      />
                    )}

                    <label className="login-label">Email </label>
                    <input
                      type="text"
                      placeholder=""
                      id="Email"
                      className="login-input"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                    />
                    <label className="login-label">Password </label>
                    <input
                      type="Password"
                      placeholder=""
                      id="Password"
                      className="login-input"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                    {!isLoginMode && (
                      <label className="login-label">Birth Date </label>
                    )}
                    {!isLoginMode && (
                      <input
                        id="BirthDate"
                        type="date"
                        className="login-input"
                        onChange={(e) => setDate(e.target.value)}
                        value={datee}
                        required
                      />
                    )}
                    <br />
                    <br />
                    <button
                      type="submit"
                      disabled={isButtonDisabled}
                      className="login-button"
                      style={{
                        backgroundColor: isButtonDisabled
                          ? "#DDB091"
                          : "#b93946",
                      }}
                    >
                      {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </button>
                    <br />
                    <br />
                    <button
                      className="login-button "
                      type="button"
                      onClick={() => setIsLoginMode(!isLoginMode)}
                    >
                      SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Auth;
