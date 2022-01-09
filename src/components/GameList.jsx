import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { GameCard } from "./GameCard";

export const GameList = () => {
  const [games, setGames] = useState([]);
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    console.log("LOGGING GAMES");
    const q = query(
      collection(db, "game_list"),
      where("user_id", "==", `${userAuth.curr_user.uid}`)
    );
    const unsub = onSnapshot(q, (qSnapshot) => {
      const game_list = [];
      qSnapshot.forEach((doc) => {
        game_list.push(doc.data());
      });
      setGames(game_list[0].game_objs);
      //console.log("DATAA");
      //console.log(game_list[0].game_objs);
    });
    return () => unsub();
  }, [userAuth.curr_user.uid]);

  return (
    <>
      {games.map((game) => {
        return <GameCard {...game}></GameCard>;
      })}
    </>
  );
};
