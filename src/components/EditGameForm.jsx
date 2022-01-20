import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { Notify } from "../utilities/Notify";

export const EditGameForm = ({
  editObj,
  setEditObj,
  existingGames,
  setGames,
  documentID,
  setEditToggle,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    existingGames[
      existingGames.findIndex((game) => game.title === editObj.title)
    ] = editObj;
    await updateDoc(doc(db, "game_list", `${documentID}`), {
      game_objs: existingGames,
    });
    Notify("Game stats updated");
    setEditToggle(false);
    setGames(existingGames);
  };
  return (
    <>
      {editObj && (
        <form
          onSubmit={handleSubmit}
          className="bg-background-1000 h-auto max-w-xl rounded-lg flex flex-col px-4 py-4 xs:px-8 xs:py-8 text-neutral-50 justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 xs:w-4/5 md:w-fit"
        >
          <div>
            <label className="block mb-0.5 font-semibold">Title</label>
            <div className="flex w-full">
              <input
                type="text"
                readOnly
                required
                value={editObj.title}
                className="rounded-t-sm bg-background-950 px-2 py-1 focus:outline-none w-full mb-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-0.5 font-semibold">Status</label>
                <div className="relative w-full">
                  <span className="absolute right-2">
                    <i className="arrow-down"></i>
                  </span>
                  <select
                    onChange={(e) =>
                      setEditObj({ ...editObj, status: e.target.value })
                    }
                    value={editObj.status}
                    className="rounded-sm bg-background-950 mb-3 px-2 py-1  w-full"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Playing">Playing</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Dropped">Dropped</option>
                  </select>
                </div>
                <label className="block mb-0.5 font-semibold">Hours</label>
                <input
                  type="text"
                  required
                  pattern="^[0-9]{0,6}$"
                  value={editObj.hours}
                  placeholder="In-game hours"
                  className="rounded-sm bg-background-950 mb-3 px-2 py-1 w-full focus:outline-none "
                  onChange={(e) =>
                    setEditObj({ ...editObj, hours: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-0.5 font-semibold">
                  Replayability
                </label>
                <div className="relative w-full">
                  <span className="absolute right-2">
                    <i className="arrow-down"></i>
                  </span>
                  <select
                    onChange={(e) =>
                      setEditObj({
                        ...editObj,
                        replayability: e.target.value,
                      })
                    }
                    value={editObj.replayability}
                    className="rounded-sm bg-background-950 mb-3 px-2 py-1  w-full"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <label className="block mb-0.5 font-semibold">Rating</label>
                <input
                  type="text"
                  required
                  pattern="\d{0,1}(?:\.\d)|10|\d?$"
                  value={editObj.rating}
                  placeholder="Score out of 10"
                  className="rounded-sm bg-background-950 mb-3 px-2 py-1 w-full focus:outline-none "
                  onChange={(e) =>
                    setEditObj({ ...editObj, rating: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <button className="bg-buttonbg-900 bg-10 px-8 h-12 font-medium rounded-md flex justify-center items-center mt-5">
            Edit Game
          </button>
        </form>
      )}
    </>
  );
};
