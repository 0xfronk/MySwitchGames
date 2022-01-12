import { Link } from "react-router-dom";
export const Error = () => {
  return (
    <Link to="/">
      <h1 className="text-2xl text-neutral-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Page not found, click to return home
      </h1>
    </Link>
  );
};
