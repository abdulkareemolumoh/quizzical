import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../components/Firebase";
import { useAuth } from "../components/AuthContext";
import Avatar from "../assets/Avatar.jpg";

export default function ProfilePage() {
  const { user, userData, setUserData } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  const [disableToggle, setDisableToggle] = React.useState(
    userData ? true : false
  );
  // const [profilePicture, setProfilePicture] = React.useState(null);

  const handleChange = (e) => {
    if (!userData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // const handleImageChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   const storageRef = firebase.storage().ref();
  //   const fileRef = storageRef.child(selectedFile.name);
  //   fileRef.put(selectedFile).then((snapshot) => {
  //     fileRef.getDownloadURL().then((url) => {
  //       setProfilePicture(url);
  //     });
  //   });
  // };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "userData", user.uid), { ...formData });

    const docRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.exists() ? docSnap.data() : null;
    setUserData(userData);

    setDisableToggle(true);
  };

  function handleEditProfile(e) {
    setDisableToggle(false);
    handleChange(e);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    if (userData) {
      const userDataRef = doc(db, "userData", user.uid);
      await updateDoc(userDataRef, { ...formData });

      const docRef = doc(db, "userData", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.exists() ? docSnap.data() : null;
      setUserData(userData);

      setDisableToggle(true);
    }

    setDisableToggle(true);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl my-4">Profile</h1>
      <form
        onSubmit={handleCreateProfile}
        className="flex flex-col items-end p-4 rounded-lg"
      >
        {/* <img src={Avatar} alt="profilePic" className="rounded-full w-40" />
        <label>
          <input
            type="image"
            src={Avatar}
            alt="profilePicture"
            className="rounded-full w-40"
          />
        </label>
        <label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            // onClick={}
            disabled={disableToggle}
          /> */}
        {/* </label> */}
        <label className="m-2 text-xl">
          First Name:
          <input
            type="text"
            placeholder={userData ? userData.firstName : "First Name"}
            name="firstName"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disableToggle
                  ? userData.firstName
                  : formData.firstName
                : formData.firstName
            }
            onChange={handleChange}
            disabled={disableToggle}
          />
        </label>
        <label className="m-2 text-xl">
          Surname:
          <input
            type="text"
            placeholder={userData ? userData.surname : "Surname"}
            name="surname"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disableToggle
                  ? userData.surname
                  : formData.surname
                : formData.surname
            }
            onChange={handleChange}
            disabled={disableToggle}
          />
        </label>
        <label className="m-2 text-xl">
          Email:
          <input
            type="email"
            placeholder={userData ? userData.email : "Email"}
            name="email"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disableToggle
                  ? userData.email
                  : formData.email
                : formData.email
            }
            onChange={handleChange}
            disabled={disableToggle}
          />
        </label>
        <label className="m-2 p-2 text-xl">
          Phone Number:
          <input
            type="tel"
            placeholder={userData ? userData.phoneNumber : "Phone Number"}
            name="phoneNumber"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disableToggle
                  ? userData.phoneNumber
                  : formData.phoneNumber
                : formData.phoneNumber
            }
            onChange={handleChange}
            disabled={disableToggle}
          />
        </label>
        <label className="m-2 text-xl">
          Gender:
          <input
            list="genders"
            name="gender"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disableToggle
                  ? userData.gender
                  : formData.gender
                : formData.gender
            }
            onChange={handleChange}
            placeholder={userData ? userData.gender : "Gender"}
            disabled={disableToggle}
          />
          <datalist id="genders">
            <option value="Male" />
            <option value="Female" />
            <option value="Prefe not to say" />
          </datalist>
        </label>
        <div className="flex justify-center m-auto gap-x-4">
          {!userData && (
            <button
              type="submit"
              className="text-xl m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300"
              disabled={disableToggle}
            >
              Save
            </button>
          )}
          {userData && (
            <button
              type="button"
              className="text-xl m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300 disabled:bg-gray-200"
              onClick={handleUpdateProfile}
              disabled={disableToggle}
            >
              Update Profile
            </button>
          )}

          {disableToggle && (
            <button
              type="button"
              className="text-xl m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300"
              onClick={handleEditProfile}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
