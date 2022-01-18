import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const GameCard = React.memo(
  ({
    gameObj,
    existingGames,
    setGames,
    documentID,
    id,
    setFormToggles,
    formToggles,
    setEditObj,
  }) => {
    const { userAuth } = useContext(AuthContext);
    let browsing_id = "";
    if (userAuth.curr_user === null) {
      browsing_id = "guest";
    } else {
      browsing_id = userAuth.curr_user.uid;
    }
    const handleGameDelete = async () => {
      const resultingGames = existingGames.filter((game) => {
        return game.title !== gameObj.title;
      });
      await updateDoc(doc(db, "game_list", `${documentID}`), {
        game_objs: resultingGames,
      });
      setGames(resultingGames);
    };
    const handleGameEdit = (currentGame) => {
      setEditObj({ ...currentGame });
      setFormToggles({ ...formToggles, editToggle: true });
    };

    return (
      <>
        <div className="rounded-lg h-game w-game relative mb-5 inline-block game-card transition-all">
          {browsing_id === id && (
            <div className="bg-zinc-700 bg-opacity-90 absolute h-10 w-full z-100 rounded-t-md delete-card hidden">
              <p
                className="text-sky-500 absolute font-semibold top-2 left-3 cursor-pointer"
                onClick={() => handleGameEdit(gameObj)}
              >
                Edit
              </p>
              <p
                className="text-red-500 absolute font-semibold top-2 right-3 cursor-pointer"
                onClick={handleGameDelete}
              >
                Remove
              </p>
            </div>
          )}
          <img
            src={gameObj.img_url}
            alt="Game cover"
            className="h-game w-game object-cover rounded-lg"
          />
          <div className="bg-zinc-700 bg-opacity-70 absolute h-40 w-full bottom-0 z-100 rounded-b-lg leading-5 text-left px-2 py-2">
            <h1 className="text-lg text-neutral-50 font-bold leading-5 pb-1">
              {gameObj.title}
            </h1>
            <p className="text-neutral-50 font-medium">{gameObj.status}</p>
            <p className="text-neutral-50">{gameObj.hours} hours</p>
            <p className="text-neutral-50">
              {gameObj.replayability} Replayability
            </p>
            <p className="text-neutral-50">{gameObj.rating} out of 10</p>
          </div>
        </div>
      </>
    );
  }
);
