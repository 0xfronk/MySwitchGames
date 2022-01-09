export const AutoSearchBar = ({ title, setTitle }) => {
  return (
    <>
      <label className="block mb-0.5 font-semibold">Title</label>
      <input
        type="text"
        required
        value={title}
        className="rounded-sm bg-background-950 mb-3 px-2 py-1  w-full"
        placeholder="Game name"
        onChange={(e) => setTitle(e.target.value)}
      />
    </>
  );
};
