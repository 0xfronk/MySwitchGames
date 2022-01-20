import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { GameListHeader } from "../components/GameListHeader";
import { GameCardContainer } from "../components/GameCardContainer";
import { Donut } from "../components/Donut";
import spinner from "../assets/loading.svg";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { Notify } from "../utilities/Notify";

export const Home = () => {
  const [games, setGames] = useState([]);
  const [amount, setAmount] = useState(0);
  const [hours, setHours] = useState(0);
  const [documentID, setDocumentID] = useState([]);
  const [username, setUsername] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, "game_list"),
      where("user_id", "==", `${id}`)
    );
    const unsub = onSnapshot(q, (qSnapshot) => {
      const game_list = [];
      const doc_id = [];
      qSnapshot.forEach((doc) => {
        game_list.push(doc.data());
        doc_id.push(doc.id);
      });
      if (game_list.length === 0) {
        Notify("This user ID doesn't exist");
        Navigate("/");
      } else {
        setIsLoading(false);
        setDocumentID(doc_id[0]);
        setAmount(game_list[0].game_objs.length);
        setUsername(game_list[0].username);

        let game_hours = 0;
        game_list[0].game_objs.forEach(
          (game) => (game_hours += parseInt(game.hours))
        );
        setHours(game_hours);
        setGames(game_list[0].game_objs);
      }
    });
    return () => unsub();
  }, [id, Navigate]);
  if (isLoading) {
    return (
      <img
        src={spinner}
        alt="Loading spinner"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24"
      />
    );
  }
  return (
    <div className="w-10/12 xs:w-4/5 max-w-7xl m-auto">
      <Navbar />
      {username !== "" && (
        <h1 className="text-neutral-50 text-md xxs:text-lg xs:text-xl font-bold">
          {username}'s Game List
        </h1>
      )}
      <GameListHeader
        amount={amount}
        hours={hours}
        existingGames={games}
        setGames={setGames}
        id={id}
        documentID={documentID}
      />
      <div className="custom-grid">
        <GameCardContainer
          games={games}
          setGames={setGames}
          documentID={documentID}
          id={id}
        />
      </div>
      {games.length > 0 && (
        <div>
          <h1 className="text-neutral-50 text-center text-3xl mb-5 mt-5 font-bold">
            Games by Genre
          </h1>
          <div className="w-4/5 xs:w-9/12 md:w-4/5 max-w-7xl m-auto flex justify-center pb-5">
            <Donut games={games} />
          </div>
        </div>
      )}
    </div>
  );
};
