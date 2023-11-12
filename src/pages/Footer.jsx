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
      <footer className="flex justify-between px-8 py-6 bg-black  border-t-[0.0125rem] border-blue-800  w-full">
        <div className="flex justify-between items-center">
          <a
            href="https://github.com/abdulkareemolumoh"
            target="_"
            className="px-4"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" color="white" />
          </a>
          <a
            href="https://www.linkedin.com/in/abdulkareemolumoh/"
            target="_"
            className="px-4"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" color="white" />
          </a>
          <a href="https://wa.link/5pupln" target="_" className="px-4">
            <FontAwesomeIcon icon={faWhatsapp} size="xl" color="white" />
          </a>
        </div>

        <div className="flex justify-around">
          <h2 className="">🤖</h2>
          <h2 className="text-red-500 text-lg mx-2">Copyright 2023</h2>
        </div>
      </footer>
    </div>
  );
}
