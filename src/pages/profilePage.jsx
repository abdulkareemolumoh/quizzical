import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../components/Firebase";
import { useAuth } from "../components/AuthContext";
import Avatar from "../assets/Avatar.jpg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ProfilePage() {
  const { user, userData, setUserData } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  const [disable, setDisable] = React.useState(true);
  const [profilePicture, setProfilePicture] = React.useState(Avatar);

  const handleChange = (e) => {
    // if (!userData) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // } else {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
  };

  const handleImageChange = (e) => {
    // const selectedFile = e.target.files[0];
    // if (selectedFile) {
    setProfilePicture(e.target.files[0] || userData.picture);
    // } else {
    //   setProfilePicture(userData.picture);
    // }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    const profileImageRef = ref(
      storage,
      `profileImages/${user.uid}/${profilePicture.name}`
    );
    uploadBytes(profileImageRef, profilePicture).then(async (snapshot) => {
      const fullPath = snapshot.metadata.fullPath;
      const downloadURL = await getDownloadURL(ref(storage, fullPath));

      await setDoc(doc(db, "userData", user.uid), {
        ...formData,
        picture: downloadURL,
      });

      const docRef = doc(db, "userData", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.exists() ? docSnap.data() : null;
      setUserData(userData);
    });

    setDisable(true);
  };

  function handleEditProfile(e) {
    setDisable(false);
    if (userData) {
      setFormData(userData);
      setProfilePicture(userData.picture);
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    if (profilePicture !== userData.picture) {
      const profileImageRef = ref(
        storage,
        `profileImages/${user.uid}/${profilePicture.name}`
      );
      await uploadBytes(profileImageRef, profilePicture);
      const fullPath = profileImageRef.fullPath;
      const downloadURL = await getDownloadURL(ref(storage, fullPath));
      await updateDoc(doc(db, "userData", user.uid), {
        ...formData,
        picture: downloadURL,
      });
    } else {
      await updateDoc(doc(db, "userData", user.uid), { ...formData });
    }

    const docRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(docRef);
    const updatedUserData = docSnap.exists() ? docSnap.data() : null;

    setUserData(updatedUserData);

    setDisable(true);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl my-4">Profile</h1>
      <form
        onSubmit={handleCreateProfile}
        className="flex flex-col items-end p-4 rounded-lg"
      >
        <img
          src={userData ? userData.picture : Avatar}
          alt="profilePic"
          className="w-48 mx-auto my-4 rounded-xl"
        />

        {!disable && (
          <label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
        <label className="m-2 text-xl">
          First Name:
          <input
            type="text"
            placeholder={
              userData
                ? userData.firstName
                  ? userData.firstName
                  : "First Name"
                : "First Name"
            }
            name="firstName"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disable
                  ? userData.firstName
                  : formData.firstName
                : formData.firstName
            }
            onChange={handleChange}
            disabled={disable}
          />
        </label>
        <label className="m-2 text-xl">
          Surname:
          <input
            type="text"
            placeholder={
              userData
                ? userData.surname
                  ? userData.surname
                  : "Surname"
                : "Surname"
            }
            name="surname"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disable
                  ? userData.surname
                  : formData.surname
                : formData.surname
            }
            onChange={handleChange}
            disabled={disable}
          />
        </label>
        <label className="m-2 text-xl">
          Email:
          <input
            type="email"
            placeholder={
              userData ? (userData.email ? userData.email : "Email") : "Email"
            }
            name="email"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disable
                  ? userData.email
                  : formData.email
                : formData.email
            }
            onChange={handleChange}
            disabled={disable}
          />
        </label>
        <label className="m-2 p-2 text-xl">
          Phone Number:
          <input
            type="tel"
            placeholder={
              userData
                ? userData.phoneNumber
                  ? userData.phoneNumber
                  : "Phone Number"
                : "Phone Number"
            }
            name="phoneNumber"
            className="m-2 p-2 text-xl rounded-md text-black disabled:bg-none disabled:border-none "
            value={
              userData
                ? disable
                  ? userData.phoneNumber
                  : formData.phoneNumber
                : formData.phoneNumber
            }
            onChange={handleChange}
            disabled={disable}
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
                ? disable
                  ? userData.gender
                  : formData.gender
                : formData.gender
            }
            onChange={handleChange}
            placeholder={
              userData
                ? userData.gender
                  ? userData.gender
                  : "Gender"
                : "Gender"
            }
            disabled={disable}
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
              disabled={disable}
            >
              Save
            </button>
          )}
          {userData && (
            <button
              type="button"
              className="text-xl m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300 disabled:bg-gray-200"
              onClick={handleUpdateProfile}
              disabled={disable}
            >
              Update Profile
            </button>
          )}

          {disable && (
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
