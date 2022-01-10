import { useState, useContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase/config";

export const useLogin = () => {
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    return () => setIsInterrupted(true);
  }, []);

  const login = () => {
    setErrorMsg(null);
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then(async (res) => {
        const user = res.user;
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          console.log("NEW USER DETECTED");
          await addDoc(collection(db, "game_list"), {
            game_objs: [],
            user_id: user.uid,
          });
        }
        setUserAuth({ ...userAuth, curr_user: user });

        if (!isInterrupted) {
          setErrorMsg(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isInterrupted) {
          const errorMessage = err.message;
          setErrorMsg(errorMessage);
          console.log(errorMessage);
        }
      });
  };
  return { login, errorMsg, isLoading };
};
