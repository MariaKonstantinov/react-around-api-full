import React from "react";
// import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Travel Stories.
      </p>
    </footer>
  );
}

export default Footer;
