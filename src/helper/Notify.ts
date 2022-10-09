import toast from "react-hot-toast";

const Notify = (text: string) => {
  return toast.error(text);
};

export default Notify;
