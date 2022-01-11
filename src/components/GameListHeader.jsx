import { BsPlusSquareDotted } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const GameListHeader = ({
  amount,
  hours,
  setFormToggle,
  id,
  setUsernameFormToggle,
}) => {
  const { userAuth } = useContext(AuthContext);
  let browsing_id = "";
  if (userAuth.curr_user === null) {
    browsing_id = "guest";
  } else {
    browsing_id = userAuth.curr_user.uid;
  }

  return (
    <div className="flex w-full mb-5 items-center text-neutral-50 text-lg">
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
        <div className="flex ml-auto items-center">
          <AiOutlineSetting
            className="cursor-pointer mr-5"
            size={33}
            fill={"#EEEEEE"}
            onClick={() => setUsernameFormToggle(true)}
          />

          <BsPlusSquareDotted
            className="cursor-pointer"
            size={30}
            fill={"#EEEEEE"}
            onClick={() => setFormToggle(true)}
          />
        </div>
      )}
    </div>
  );
};
