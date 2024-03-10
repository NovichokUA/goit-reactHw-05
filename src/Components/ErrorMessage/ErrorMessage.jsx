import toast from "react-hot-toast";

const ErrorMessage = ({ error }) => {
  return toast.error(`${error.message}. Please reload the page.`);
};

export default ErrorMessage;
