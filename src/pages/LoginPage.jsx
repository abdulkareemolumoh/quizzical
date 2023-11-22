import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../components/Firebase";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSignIn() {
    if (!email || !password) {
      message.error("Please enter email and password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        message.success("Suceessfully signed in!");
        login(userCredential.user);
        navigate("/quiz");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function handleSignUp(event) {
    event.preventDefault();
    if (!email || !password) {
      message.error("Please enter email and password");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        login(userCredential.user);
        navigate("/profilePage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function handleSignInWithGoogle(event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        message.success("Suceessfully signed in!");
        login(result.user);
        navigate("/quiz");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div>
      <form className="min-h-screen flex flex-col font-semibold justify-center items-center">
        <h1 className="text-2xl my-4">Login</h1>
        <label className="m-2 text-xl">
          Username:
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleEmailChange}
            value={email}
            className="m-2 text-xl rounded-md"
          />
        </label>

        <label className="m-2 text-xl">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handlePasswordChange}
            className="m-2 text-xl rounded-md"
          />
        </label>

        <button
          type="button"
          onClick={handleSignIn}
          className="text-xl m-1 bg-gray-500 px-2 py-1 rounded-lg hover:bg-gray-300"
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="text-xl m-1 bg-gray-500 px-2 py-1 rounded-lg hover:bg-gray-300"
        >
          Sign up
        </button>
        <button
          onClick={handleSignInWithGoogle}
          className="text-xl m-1 bg-gray-500 px-2 py-1 rounded-lg hover:bg-gray-300"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
