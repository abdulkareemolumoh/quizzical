import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-contact">
          <a href="https://github.com/abdulkareemolumoh" target="_">
            <FontAwesomeIcon icon={faGithub} size="2xl" color="white" />
          </a>
          <a href="https://www.linkedin.com/in/abdulkareemolumoh/" target="_">
            <FontAwesomeIcon icon={faLinkedin} size="2xl" color="white" />
          </a>
          <a href="https://wa.link/5pupln" target="_">
            <FontAwesomeIcon icon={faWhatsapp} size="2xl" color="white" />
          </a>
        </div >

        <div className="footer-copyright">
          <h2>🤖</h2>
          <h2>Copyright 2023</h2>
        </div >
      </footer>
    </div>
  );
}
