import { useState, useContext } from "react";
import { BsPlusSquareDotted } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { GameForm } from "./GameForm";
import { UsernameModal } from "./UsernameModal";
import { AuthContext } from "../context/AuthContext";

export const GameListHeader = ({
  amount,
  hours,
  id,
  documentID,
  existingGames,
  setGames,
}) => {
  const [addToggle, setAddToggle] = useState(false);
  const [usernameToggle, setUsernameToggle] = useState(false);
  const { userAuth } = useContext(AuthContext);
  let browsing_id = "";
  if (userAuth.curr_user === null) {
    browsing_id = "guest";
  } else {
    browsing_id = userAuth.curr_user.uid;
  }

  return (
    <div className="flex w-full mb-5 items-center text-neutral-50 text-sm xxs:text-md xs:text-lg">
      {amount === 1 ? (
        <h3>
          <span className="font-bold">{amount}</span> game played &nbsp;{"   "}
          <span className="font-bold"> {hours}</span> total hours in game
        </h3>
      ) : (
        <h3>
          <span className="font-bold">{amount}</span> games played &nbsp;{"   "}
          <span className="font-bold"> {hours}</span> total hours in game
        </h3>
      )}
      {browsing_id === id && (
        <div className="flex ml-auto items-center settings-icon pl-2 sm:pl-0">
          <AiOutlineSetting
            className="cursor-pointer mr-5"
            fill={"#EEEEEE"}
            onClick={() => setUsernameToggle(true)}
          />

          <BsPlusSquareDotted
            className="cursor-pointer add-icon"
            fill={"#EEEEEE"}
            onClick={() => setAddToggle(true)}
          />
        </div>
      )}
      {usernameToggle && (
        <div
          className="bg-neutral-900 opacity-80 h-screen w-screen fixed top-0 left-0 cursor-pointer z-10"
          onClick={() => setUsernameToggle(false)}
        ></div>
      )}
      {addToggle && (
        <div
          className="bg-neutral-900 opacity-80 h-screen w-screen fixed top-0 left-0 cursor-pointer z-10"
          onClick={() => setAddToggle(false)}
        ></div>
      )}
      {addToggle && (
        <GameForm
          existingGames={existingGames}
          documentID={documentID}
          setGames={setGames}
          setAddToggle={setAddToggle}
        />
      )}
      {usernameToggle && (
        <UsernameModal
          setUsernameToggle={setUsernameToggle}
          documentID={documentID}
        />
      )}
    </div>
  );
};
