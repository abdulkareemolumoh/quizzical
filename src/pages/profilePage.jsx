import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../components/Firebase";
import { useAuth } from "../components/AuthContext";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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
  const [file, setFile] = React.useState(null);
  const [perc, setPerc] = React.useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    if (!userData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // If a file is selected, set it in the state
      setFile(URL.createObjectURL(selectedFile));
    } else {
      // If no file is selected, set it to the default Avatar
      setFile(null); // or set it to the URL of your default Avatar
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    setDoc(doc(db, "userData", user.uid), {
      ...formData,
    });

    const docRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.exists() ? docSnap.data() : null;

    // getDownloadURL(ref(storage, `images/${user.uid}`))
    //   .then((url) => {
    //     setProfilePicture(url);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    setUserData(userData);

    alert("Image uploaded");

    setDisableToggle(true);
  };

  const handleEditProfile = (e) => {
    setDisableToggle(false);
    handleChange(e);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (userData) {
      const userDataRef = doc(db, "userData", user.uid);
      await updateDoc(userDataRef, { ...formData });

      // try {
      //   // Upload the image to Firebase Storage
      //   const imageRef = ref(storage, `images/${user.uid}`);
      //   await uploadBytes(imageRef, profilePicture);

      //   // Get the download URL of the uploaded image
      //   const downloadURL = await getDownloadURL(imageRef);

      //   // Update the Firestore document with the download URL
      //   await setDoc(doc(db, "userData", user.uid), {
      //     ...formData,
      //     profilePicture: downloadURL,
      //   });

      //   // Fetch and set user data
      //   const docRef = doc(db, "userData", user.uid);
      //   const docSnap = await getDoc(docRef);
      //   const userData = docSnap.exists() ? docSnap.data() : null;
      //   setUserData(userData);

      //   // Show an alert after successful image upload
      //   alert("Image uploaded");

      //   // Disable form editing
      //   setDisableToggle(true);
      // } catch (error) {
      //   console.error("Error creating profile:", error);
      // }
    }

    const docRef = doc(db, "userData", user.uid);
    try {
      const docSnap = await getDoc(docRef);
      const userData = docSnap.exists() ? docSnap.data() : null;
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    setDisableToggle(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl my-4">Profile</h1>
      <form
        onSubmit={handleCreateProfile}
        className="flex flex-col items-end p-4 rounded-lg"
      >
        <img src={file ?? Avatar} alt="profilePic" className="rounded-full w-40" />
        <label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleInputChange}
            disabled={disableToggle}
          />
        </label>

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
