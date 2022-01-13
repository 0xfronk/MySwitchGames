import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { gameData } from "../data/games";
import { v4 as uuidv4 } from "uuid";

export const AutoSearchBar = ({ title, setTitle }) => {
  const [searchFilteredData, setSearchFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setTitle(searchData);
    const filteredData = gameData.filter((game) => {
      return game.title.toLowerCase().includes(searchData.toLowerCase());
    });
    if (searchData === "") {
      setSearchFilteredData([]);
    } else {
      setSearchFilteredData(filteredData);
    }
  };
  return (
    <div className="mb-3">
      <label className="block mb-0.5 font-semibold">Title</label>
      <div className="flex items-center">
        <input
          type="text"
          required
          value={title}
          className="rounded-t-sm bg-background-950 px-2 py-1 focus:outline-none w-full"
          placeholder="Game name"
          onChange={handleSearch}
        />
        {title.length === 0 ? (
          <BsSearch size={16} fill={"#EEEEEE"} className="-ml-7" />
        ) : (
          <MdOutlineClose
            size={20}
            fill={"#EEEEEE"}
            className="-ml-7 cursor-pointer"
            onClick={() => {
              setSearchFilteredData([]);
              setTitle("");
            }}
          />
        )}
      </div>
      {searchFilteredData.length > 0 && (
        <div className="h-24! search-data-width z-100 bg-background-1100 rounded-b-sm fixed overflow-y-scroll z-10">
          {searchFilteredData.slice(0, 5).map((game) => {
            return (
              <div
                key={uuidv4()}
                className="h-auto flex items-center px-2 py-1 hover:bg-green-600 cursor-pointer overflow-hidden break-all"
                onClick={() => {
                  setTitle(game.title);
                  setSearchFilteredData([]);
                }}
              >
                <h1 className="text-neutral-50 font-semibold">{game.title}</h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
