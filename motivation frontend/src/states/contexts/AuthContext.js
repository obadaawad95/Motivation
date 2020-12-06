import React, { createContext, useCallback, useState, useEffect } from "react";

let logoutTimer;

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [token, setToken] = useState(null);
  const [age, setAge] = useState(null);

  const [tokenExpirationDatee, setTokenExpirationDatee] = useState();

  const login = useCallback((uid, uName, uImg, token, uage, expirationDate) => {
    setUserId(uid);
    setUserName(uName);
    setUserImg(uImg);
    setToken(token);
    setAge(uage);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDatee(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        name: uName,
        image: uImg,
        token: token,
        age: uage,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setTokenExpirationDatee(null);
    setUserId(null);
    setUserName(null);
    setUserImg(null);
    setToken(null);
    setAge(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDatee) {
      const remainingTime =
        tokenExpirationDatee.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDatee]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.name,
        storedData.image,
        storedData.token,
        storedData.age,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        userName: userName,
        userImg: userImg,
        token: token,
        age: age,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
