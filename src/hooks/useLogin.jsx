import { useState, useContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const Navigate = useNavigate();

  useEffect(() => {
    return () => setIsInterrupted(true);
  }, []);

  const login = () => {
    setErrorMsg(null);
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then(async (res) => {
        const user = res.user;
        console.log(user.metadata.creationTime);
        console.log(user.metadata.lastSignInTime);
        console.log(user.uid);

        //2 minutes of delay with this method of detecting a new user is possible to alleviate database load so querying is needed
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          const q = query(
            collection(db, "game_list"),
            where("user_id", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          let count = 0;
          querySnapshot.forEach((doc) => {
            count += 1;
          });
          if (count === 0) {
            console.log("NEW USER DETECTED");
            await addDoc(collection(db, "game_list"), {
              game_objs: [],
              user_id: user.uid,
              username: "",
            });
          }
        }
        Navigate(`/gamelist/${user.uid}`);
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
