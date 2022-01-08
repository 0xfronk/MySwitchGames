import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({ state: null, isReady: false });
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserAuth({ state: user, isReady: true });
      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
