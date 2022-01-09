import { BsPlusSquareDotted } from "react-icons/bs";

export const GameListHeader = ({ amount, hours, setFormToggle }) => {
  return (
    <div className="flex w-full justify-between mb-5 items-center text-neutral-50 text-lg">
      <h3>
        <span className="font-bold">{amount}</span> games played &nbsp;{"   "}
        <span className="font-bold"> {hours}</span> total hours in game
      </h3>
      <BsPlusSquareDotted
        className="cursor-pointer"
        size={30}
        fill={"#EEEEEE"}
        onClick={() => setFormToggle(true)}
      />
    </div>
  );
};
