export const GameCard = ({
  title,
  status,
  replayability,
  rating,
  img_url,
  hours,
}) => {
  return (
    <div className="rounded-lg relative mb-5 inline-block">
      <img
        src={img_url}
        alt="Game cover"
        className="h-game w-game object-cover rounded-lg"
      />
      <div className="bg-zinc-700 bg-opacity-70 absolute h-40 w-game bottom-0 z-100 rounded-b-lg overflow-scroll leading-5 text-left px-2 py-2">
        <h1 className="text-lg text-neutral-50 font-bold leading-5 pb-1">
          {title}
        </h1>
        <p className="text-neutral-50 font-medium">{status}</p>
        <p className="text-neutral-50">{hours} hours</p>
        <p className="text-neutral-50">{replayability} Replayability</p>
        <p className="text-neutral-50">{rating} out of 10</p>
      </div>
    </div>
  );
};
