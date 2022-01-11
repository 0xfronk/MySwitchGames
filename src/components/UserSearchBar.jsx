import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { Notify } from "../utilities/Notify";

export const UserSearchBar = () => {
  const [searchUser, setSearchUser] = useState("");
  const Navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "game_list"),
      where("username", "==", searchUser)
    );
    const querySnapshot = await getDocs(q);
    const user_list = [];
    querySnapshot.forEach((doc) => {
      user_list.push(doc.data());
    });
    if (user_list.length === 1) {
      setSearchUser("");
      Navigate(`/gamelist/${user_list[0].user_id}`);
    } else {
      Notify("User not found");
    }
  };
  return (
    <form onSubmit={searchHandler} className="w-2/5">
      <input
        className="bg-background-1100 text-neutral-50 h-10 w-full rounded-md text-md px-2"
        placeholder="Search user by username"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      ></input>
    </form>
  );
};
