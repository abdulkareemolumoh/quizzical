import { Timestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../components/Firebase";
import { useAuth } from "../components/AuthContext";
import Avatar from "../assets/Avatar.jpg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Spin } from "antd";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0] || userData.picture);
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
        createdAt: Timestamp.now(),
        quizScoreData: {
          quizScore: 0,
          quizCategory: "",
          quizDifficulty: "",
          quizHighestScore: [],
          quizScoreHistory: [],
        },
        quizHistory: [],
        quizData: [],
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

  // const renderInputField = (label, name, type = "text", placeholder) => (
  //   <label key={name} className="m-2 text-sm">
  //     {label}:
  //     <input
  //       type={type}
  //       placeholder={placeholder || label}
  //       name={name}
  //       className="m-2 p-2 text-sm rounded-md text-black disabled:bg-none disabled:border-none"
  //       value={disable ? (userData ? userData[name] : "") : formData[name]}
  //       onChange={handleChange}
  //       disabled={disable}
  //     />
  //   </label>
  // );

  let recentQuizHistory;
  if (userData === undefined) {
    recentQuizHistory = (
      <div className="flex justify-center items-center h-full">
        <Spin />
      </div>
    );
  } else if (userData == null) {
    recentQuizHistory = (
      <div className="flex justify-center items-center h-full">
        <h1>No Quiz History</h1>
      </div>
    );
  } else {
    recentQuizHistory = Object.entries(userData.quizScoreData.quizScoreHistory)
      .sort()
      .reverse()
      .slice(0, 5)
      .map(([key, value]) => (
        <div key={key} className="m-2 text-sm">
          <div className="grid grid-cols-4 ">
            <p className="m-2 ">{value[0]}</p>
            <p className="m-2 ">{value[2]}</p>
            <p className="m-2">{value[3]}</p>
            <p className="m-2">{value[1]}</p>
          </div>
        </div>
      ));
  }

  let scoreRank;
  if (userData === undefined) {
    scoreRank = (
      <div className="flex justify-center items-center h-full">
        <Spin />
      </div>
    );
  } else if (userData == null) {
    scoreRank = (
      <div className="flex justify-center items-center h-full">
        <h1>No Quiz History</h1>
      </div>
    );
  } else {
    scoreRank = Object.entries(userData.quizScoreData.quizScoreHistory)
      .sort(([, valueA], [, valueB]) => valueB[1] - valueA[1])
      .slice(0, 3)
      .map(([key, value]) => (
        <div key={key} className="m-2 text-sm">
          <div className="grid grid-cols-4 text-center ">
            <p className="my-2 ">{value[0]}</p>
            <p className="my-2 ">{value[2]}</p>
            <p className="my-2">{value[3]}</p>
            <p className="my-2">{value[1]}</p>
          </div>
        </div>
      ));
  }

  return (
    <div className="min-h-screen ">
      <h1 className="text-2xl mt-12 mb-4 text-center">Profile</h1>
      <div className="flex flex-col gap-8 my-8">
        <div className=" bg-red-500 rounded-2xl ">
          <form
            onSubmit={handleCreateProfile}
            className="flex flex-col p-4 rounded-lg "
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
                  className="m-auto w-full rounded-md text-black"
                />
              </label>
            )}
            <label className="m-2 text-sm ">
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
                className="m-2 p-2 text-sm w-full rounded-md text-black disabled:bg-none disabled:border-none  "
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
            <label className="m-2 text-sm">
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
                className="m-2 p-2 text-sm w-full rounded-md text-black disabled:bg-none disabled:border-none  "
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
            <label className="m-2 text-sm">
              Email:
              <input
                type="email"
                placeholder={
                  userData
                    ? userData.email
                      ? userData.email
                      : "Email"
                    : "Email"
                }
                name="email"
                className="m-2 p-2 text-sm w-full rounded-md text-black disabled:bg-none disabled:border-none  "
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
            <label className="m-2 p-2 text-sm">
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
                className="m-2 p-2 text-sm w-full rounded-md text-black disabled:bg-none disabled:border-none  "
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
            <label className="m-2 text-sm">
              Gender:
              <input
                list="genders"
                name="gender"
                className="m-2 p-2 text-sm w-full rounded-md text-black disabled:bg-none disabled:border-none  "
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
                <option value="Prefer not to say" />
              </datalist>
            </label>
            <div className="flex justify-center m-auto gap-x-4">
              {!userData && (
                <button
                  type="submit"
                  className="text-sm m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300"
                  disabled={disable}
                >
                  Save
                </button>
              )}
              {userData && !disable && (
                <button
                  type="button"
                  className="text-sm m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300 disabled:bg-gray-200"
                  onClick={handleUpdateProfile}
                  disabled={disable}
                >
                  Update Profile
                </button>
              )}

              {disable && (
                <button
                  type="button"
                  className="text-sm m-1 bg-gray-500 mx-auto px-2 py-1 rounded-lg hover:bg-gray-300"
                  onClick={handleEditProfile}
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-col  gap-8">
          <div className="h-1/2  bg-red-300 rounded-2xl">
            <h1 className="text-center mt-4"> SCOREBOARD</h1>
            <h2 className="text-center ">History</h2>
            {recentQuizHistory}
          </div>
          <div className="h-1/2 bg-red-300 rounded-2xl">
            <h1 className="text-center mt-4"> Top Score</h1>
            {scoreRank}
            {/* {[
                renderInputField("First Name", "firstName"),
                renderInputField("Surname", "surname"),
                renderInputField("Email", "email", "email"),
                renderInputField("Phone Number", "phoneNumber", "tel"),
                renderInputField(
                  "Gender",
                  "gender",
                  "text",
                  "Male/Female/Prefer not to say"
                ),
              ]} */}
          </div>
        </div>
      </div>
    </div>
  );
}
