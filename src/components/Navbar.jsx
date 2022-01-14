import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserSearchBar } from "../components/UserSearchBar";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { Notify } from "../utilities/Notify";

export const Navbar = () => {
  const { userAuth } = useContext(AuthContext);
  const { login, errorMsg } = useLogin();
  const { logout } = useLogout();

  useEffect(() => {
    if (errorMsg === "Firebase: Error (auth/popup-blocked).") {
      Notify("Sign in pop-up blocked");
    }
  }, [errorMsg]);

  return (
    <nav className="w-full h-28 xs:h-32 mdlg:h-20 mdlg:pt-0 pt-2 bg-background-900 flex items-center flex-wrap">
      {userAuth.curr_user ? (
        <Link to={`/gamelist/${userAuth.curr_user.uid}`}>
          <h1 className="text-neutral-50 font-bold text-xl xxs:text-2xl xs:text-3xl mdlg:mr-8 mr-3 order-1">
            MySwitchGames
          </h1>
        </Link>
      ) : (
        <Link to={"/"}>
          <h1 className="text-neutral-50 font-bold text-xl xxs:text-2xl xs:text-3xl  mdlg:mr-8 mr-3 order-1">
            MySwitchGames
          </h1>
        </Link>
      )}
      <UserSearchBar />
      {!userAuth.curr_user && (
        <>
          <button
            onClick={login}
            className="bg-buttonbg-900 text-neutral-50 px-4 h-8 xxs:px-5 xxs:h-9 text-xs xs:text-base xs:px-8 xs:h-12 font-medium rounded-md flex justify-center items-center ml-auto md:order-2 order-1"
          >
            <FaGoogle className="inline-block mr-1 xs:mr-3 google-icon" />
            Sign In
          </button>
        </>
      )}
      {userAuth.curr_user && (
        <>
          <Link to="/" className="ml-auto md:order-2 order-1">
            <button
              onClick={logout}
              className="bg-buttonbg-900 text-neutral-50 px-4 h-8 xxs:px-5 xxs:h-9 text-xs xs:text-base xs:px-8 xs:h-12 font-medium rounded-md flex justify-center items-center "
            >
              Sign Out
            </button>
          </Link>
        </>
      )}
    </nav>
  );
};
