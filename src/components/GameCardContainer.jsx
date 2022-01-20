import { useState } from "react";
import { EditGameForm } from "./EditGameForm";
import { GameCard } from "./GameCard";
import { v4 as uuidv4 } from "uuid";

export const GameCardContainer = ({ games, setGames, documentID, id }) => {
  const [editObj, setEditObj] = useState({});
  const [editToggle, setEditToggle] = useState(false);
  return (
    <>
      {games.map((game) => {
        return (
          <GameCard
            key={uuidv4()}
            gameObj={game}
            existingGames={games}
            setGames={setGames}
            setEditObj={setEditObj}
            setEditToggle={setEditToggle}
            documentID={documentID}
            id={id}
          ></GameCard>
        );
      })}
      {editToggle && (
        <div
          className="bg-neutral-900 opacity-80 h-screen w-screen fixed top-0 left-0 cursor-pointer !z-0"
          onClick={() => setEditToggle(false)}
        ></div>
      )}
      {editToggle && (
        <EditGameForm
          editObj={editObj}
          existingGames={games}
          setGames={setGames}
          documentID={documentID}
          setEditObj={setEditObj}
          setEditToggle={setEditToggle}
        />
      )}
    </>
  );
};
