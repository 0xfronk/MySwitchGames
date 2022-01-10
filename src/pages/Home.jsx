import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { GameListHeader } from "../components/GameListHeader";
import { GameForm } from "../components/GameForm";
import { GameCard } from "../components/GameCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";

export const Home = () => {
  const [games, setGames] = useState([]);
  const [amount, setAmount] = useState(0);
  const [hours, setHours] = useState(0);
  const [formToggle, setFormToggle] = useState(false);
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
    <div className="w-4/5 xs:w-9/12 md:w-4/5 max-w-7xl m-auto">
      <Navbar />
      <GameListHeader
        amount={amount}
        hours={hours}
        setFormToggle={setFormToggle}
      />
      <div className="flex">
        {games.map((game) => {
          return <GameCard key={uuidv4()} {...game}></GameCard>;
        })}
      </div>
      {formToggle && (
        <div
          className="bg-neutral-900 opacity-80 h-screen w-screen fixed top-0 left-0 cursor-pointer"
          onClick={() => setFormToggle(false)}
        ></div>
      )}
      {formToggle && <GameForm existingGames={games} />}
    </div>
  );
};
