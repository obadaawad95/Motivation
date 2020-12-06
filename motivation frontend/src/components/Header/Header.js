import React, { useState, useEffect, useRef, useContext } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../states/contexts/AuthContext";
import "./Header.css";
const Header = ({ bool, num, top }) => {
  const auth = useContext(AuthContext);
  const [navBackground, setNavBackground] = useState(bool);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > num;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
  }, [num]);
  const shadowStyles = useFadedShadowStyles();
  return (
    <Navbar
      expand="lg"
      fixed={top}
      className={navBackground ? shadowStyles.root : null}
      style={{
        backgroundColor: navBackground ? "#B93946" : "transparent",
        transition: "0.3s",
      }}
    >
      <Navbar.Toggle onClick={() => setNavBackground(true)} />
      <Navbar.Collapse>
        <ul className="navbar-nav m-auto">
          <li className="nav-item ">
            <NavLink className="mr-5" to="/">
              <img
                src={logo}
                alt="logo"
                style={{
                  blockSize: navBackground ? "35px" : "50px",
                  paddingRight: navBackground ? "0px" : "80px",
                  transition: "0.3s",
                }}
              />
            </NavLink>
          </li>

          <li className="nav-item ">
            <NavLink
              className="nav-link text-uppercase mr-5"
              to="/"
              style={{ color: navBackground ? "#E5E5E5" : "#B93946" }}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-uppercase mr-5"
              to="/Postspage"
              style={{ color: navBackground ? "#E5E5E5" : "#B93946" }}
            >
              Posts
            </NavLink>
          </li>
          <li>
            <div className="dropdown nav-link mr-5 ">
              <button
                className="dropbtn text-uppercase"
                style={{ color: navBackground ? "#E5E5E5" : "#B93946" }}
              >
                Catogaries
              </button>
              <div className="dropdown-content">
                <NavLink to="/SportsPage">Sports</NavLink>
                <NavLink to="/BusinessesPage">Businesses</NavLink>
                <NavLink to="/StudentsPage">Students</NavLink>
              </div>
            </div>
          </li>

          {auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase mr-5"
                to="/Profilepage"
                style={{ color: navBackground ? "#E5E5E5" : "#B93946" }}
              >
                My Profile
              </NavLink>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase mr-5"
                to="/Loginpage"
                style={{ color: navBackground ? "#E5E5E5" : "#B93946" }}
              >
                Login
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link text-uppercase mr-5"
                onClick={auth.logout}
                style={{ color: navBackground ? "#E5E5E5" : "#B93946" }}
              >
                LOGOUT
              </NavLink>
            </li>
          )}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
