import "react-toastify/dist/ReactToastify.css";
import styles from "./Toast.module.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

function CustomToastContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme="colored"
      limit={3}
      transition={Bounce}
      className={`${styles.toastContainer}`}
    />
  );
}

const successToast = (content) => {
  toast.success(content, {
    autoClose: 4000,
    theme: "colored",
  });
};

const errorToast = (content) => {
  toast.error(content, {
    autoClose: 4000,
    theme: "colored",
  });
};

export default CustomToastContainer;
export { successToast, errorToast };
