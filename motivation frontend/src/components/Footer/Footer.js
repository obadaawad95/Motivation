import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import "./Footer.css";
const Footer = ({ background, socialIconColor, socialLinkColor, color }) => {
  return (
    <footer
      className="main-footer bold bold-light footer"
      style={{ background: background }}
    >
      <section className="lower-footer">
        <div className="wrap">
          <ul className="social-icons" style={{ color: socialIconColor }}>
            <li>
              <a
                href="#face"
                className="social-link"
                target="_blank"
                title="Facebook"
                style={{ background: socialLinkColor, color: color }}
              >
                <i>
                  <FacebookIcon />
                </i>
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="#insta"
                className="social-link"
                target="_blank"
                title="Instagram"
                style={{ background: socialLinkColor, color: color }}
              >
                <i>
                  <InstagramIcon />
                </i>
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="#twt"
                className="social-link"
                target="_blank"
                title="twitter"
                style={{ background: socialLinkColor, color: color }}
              >
                <i>
                  <TwitterIcon />
                </i>
                <span className="label">YouTube</span>
              </a>
            </li>
            <li>
              <a
                href="#tube"
                className="social-link"
                target="_blank"
                title="YouTube"
                style={{ background: socialLinkColor, color: color }}
              >
                <i>
                  <YouTubeIcon />
                </i>
                <span className="label">YouTube</span>
              </a>
            </li>
          </ul>
          <div className="links">
            <ul className="menu">
              <li className="menu-item ">
                <a href="#contactus" style={{ color: socialIconColor }}>
                  Contact Us
                </a>
              </li>
              <li className="menu-item ">
                <a href="# writefor us" style={{ color: socialIconColor }}>
                  Write for us
                </a>
              </li>
            </ul>
          </div>
          <p className="copyright" style={{ color: socialIconColor }}>
            &copy;{new Date().getFullYear()} MotivHub - All rights reserved
          </p>
          <div className="to-top">
            <a href="#top" className="back-to-top">
              <i style={{ color: socialIconColor }}>
                Top <ArrowDropUpIcon />
              </i>
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
