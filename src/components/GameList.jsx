import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { GameCard } from "./GameCard";
import { v4 as uuidv4 } from "uuid";
import { BsPlusSquareDotted } from "react-icons/bs";

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [amount, setAmount] = useState(0);
  const [hours, setHours] = useState(0);
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
      setAmount(game_list[0].game_objs.length);
      let game_hours = 0;
      game_list[0].game_objs.forEach((game) => (game_hours += game.hours));
      setHours(game_hours);
      setGames(game_list[0].game_objs);
    });
    return () => unsub();
  }, [userAuth.curr_user.uid]);

  return (
    <>
      <div className="flex w-full justify-between mb-5 items-center text-neutral-50 text-lg">
        <h3>
          <span className="font-bold">{amount}</span> games played &nbsp;{"   "}
          <span className="font-bold"> {hours}</span> total hours in game
        </h3>
        <BsPlusSquareDotted size={30} fill={"#EEEEEE"} />
      </div>
      {games.map((game) => {
        return <GameCard key={uuidv4()} {...game}></GameCard>;
      })}
    </>
  );
};
