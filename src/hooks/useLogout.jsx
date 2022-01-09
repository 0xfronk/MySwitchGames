import { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";

export const useLogout = () => {
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { userAuth, setUserAuth } = useContext(AuthContext);

  useEffect(() => {
    return () => setIsInterrupted(true);
  }, []);

  const logout = () => {
    setErrorMsg(null);
    setIsLoading(true);

    signOut(auth)
      .then(() => {
        setUserAuth({ ...userAuth, curr_user: null });

        if (!isInterrupted) {
          setErrorMsg(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isInterrupted) {
          setErrorMsg(null);
          setIsLoading(false);
        }
      });
  };
  return { logout, errorMsg, isLoading };
};
