import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserSearchBar } from "../components/UserSearchBar";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

export const Navbar = () => {
  const { userAuth } = useContext(AuthContext);
  const { login } = useLogin();
  const { logout } = useLogout();

  return (
    <nav className="w-full h-20 bg-background-900 flex justify-between items-center">
      <div className="flex w-4/5">
        {userAuth.curr_user ? (
          <Link to={`/gamelist/${userAuth.curr_user.uid}`}>
            <h1 className="text-neutral-50 font-bold text-3xl mr-8">
              MySwitchGames
            </h1>
          </Link>
        ) : (
          <Link to={"/"}>
            <h1 className="text-neutral-50 font-bold text-3xl mr-5">
              MySwitchGames
            </h1>
          </Link>
        )}
        <UserSearchBar />
      </div>
      {!userAuth.curr_user && (
        <>
          <button
            onClick={login}
            className="bg-buttonbg-900 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center"
          >
            <FaGoogle size={14} className="inline-block mr-3" />
            Sign In
          </button>
        </>
      )}
      {userAuth.curr_user && (
        <>
          <Link to="/">
            <button
              onClick={logout}
              className="bg-buttonbg-900 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center ml-auto"
            >
              Sign Out
            </button>
          </Link>
        </>
      )}
    </nav>
  );
};
