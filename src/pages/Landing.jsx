import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export const Landing = () => {
  const { login } = useLogin();
  const { userAuth } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to MySwitchGames</h1>
      <p>
        Track and rate your Nintendo Switch Games and share your list of games
        with others
      </p>
      {userAuth.curr_user ? (
        <Link to={`/gamelist/${userAuth.curr_user.uid}`}>
          <button
            type="button"
            className="bg-buttonbg-900 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center"
          >
            Get Started
          </button>
        </Link>
      ) : (
        <button
          type="button"
          onClick={login}
          className="bg-buttonbg-900 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center"
        >
          Get Started
        </button>
      )}
    </div>
  );
};
