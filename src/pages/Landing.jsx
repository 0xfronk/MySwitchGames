import { useLogin } from "../hooks/useLogin";

export const Landing = () => {
  const { login } = useLogin();

  return (
    <div>
      <h1>Welcome to MySwitchGames</h1>
      <p>
        Track and rate your Nintendo Switch Games and share your list of games
        with others
      </p>
      <button
        type="button"
        onClick={login}
        className="bg-green-500 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center"
      >
        Get Started
      </button>
    </div>
  );
};
