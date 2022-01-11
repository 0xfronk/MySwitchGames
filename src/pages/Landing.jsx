import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export const Landing = () => {
  const { login } = useLogin();
  const { userAuth } = useContext(AuthContext);

  return (
    <>
      <div className="background-image w-screen h-screen fixed"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 pb-2 text-neutral-50 text-center">
        <h1 className="text-5xl font-bold mb-3">Welcome to MySwitchGames</h1>
        <p className="text-xl text-neutral-100 mb-5">
          Track and rate your Nintendo Switch Games and share your list of games
          with others
        </p>
        <div className="flex w-full justify-center">
          <Link to="/gamelist/demo">
            <button
              type="button"
              className="bg-neutral-200 text-lg text-neutral-800 px-8 h-12 font-semibold rounded-md flex justify-center items-center mr-5"
            >
              View Demo
            </button>
          </Link>
          {userAuth.curr_user ? (
            <Link to={`/gamelist/${userAuth.curr_user.uid}`}>
              <button
                type="button"
                className="bg-buttonbg-900 text-lg text-neutral-50 px-8 h-12 font-semibold rounded-md flex justify-center items-center"
              >
                Get Started
              </button>
            </Link>
          ) : (
            <button
              type="button"
              onClick={login}
              className="bg-buttonbg-900 text-lg text-neutral-50 px-8 h-12 font-semibold rounded-md flex justify-center items-center"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </>
  );
};
