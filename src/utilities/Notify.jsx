import { toast } from "react-toastify";
import { HiLightningBolt } from "react-icons/hi";
export const Notify = (text) => {
  toast(
    <div className="flex items-center">
      <HiLightningBolt
        fill={"#facc15"}
        size={16}
        className="inline-block mr-3"
      />
      <p className="h-4 font-medium leading-4 toast-text">{text}</p>
    </div>,
    {
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};
