import { useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Notify } from "../utilities/Notify";

export const UsernameModal = ({ setFormToggles, formToggles, documentID }) => {
  const [formUsername, setFormUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "game_list"),
      where("username", "==", formUsername)
    );
    const querySnapshot = await getDocs(q);
    let count = 0;
    querySnapshot.forEach((doc) => {
      count += 1;
    });
    if (count === 0) {
      await updateDoc(doc(db, "game_list", `${documentID}`), {
        username: formUsername,
      });
      Notify("Updated username");
      setFormToggles({ ...formToggles, usernameToggle: false });
      setFormUsername("");
    } else {
      Notify("This username is taken");
      setFormUsername("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-1000 h-auto w-10/12 xs:w-4/5 max-w-xl rounded-lg overflow-scroll flex flex-col px-4 py-4 xs:px-8 xs:py-8 text-neutral-50 justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <label className="block mb-0.5 font-semibold text-xl">New Username</label>
      <input
        type="text"
        required
        pattern="^[a-z0-9_\.]{3,16}$"
        value={formUsername}
        placeholder="username"
        className="rounded-sm bg-background-950 mb-3 px-2 py-1 w-full focus:outline-none "
        onChange={(e) => setFormUsername(e.target.value)}
      />
      <p className="text-neutral-300">
        Usernames can contain lowercase letters, numbers from 0-9, underscores
        and periods, and must have a length of 3 to 16 characters
      </p>
      <button className="bg-buttonbg-900 bg-10 px-8 h-12 font-medium rounded-md flex justify-center items-center mt-5">
        Set Username
      </button>
    </form>
  );
};
