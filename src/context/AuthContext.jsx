import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const [loggedIn, setLoggedIn] = useState(user ? true : false);
  const [userData, setUserData] = useState(user ? user.userData : null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (loggedIn && user) {
        const docRef = doc(db, "userData", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          const fetchedUserData = docSnap.exists() ? docSnap.data() : null;
          setUserData(fetchedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    // Fetch user data only if userData is not already set
    if (!userData) {
      fetchUserData();
    }
  }, [loggedIn, user, userData]);

  async function login(user) {
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setUserData(user.userData);
  }

  function logout() {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loggedIn, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
