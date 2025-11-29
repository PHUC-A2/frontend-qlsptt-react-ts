import { ToastContainer, Slide } from "react-toastify"; // thêm Slide
import AppRouter from "./routes/AppRouter";
import { useAuthInit } from "./hooks/init/useAuthInit";

const App = () => {

  // xử lý khi F5 với auth (authSlice)
  useAuthInit();

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="dark"
        transition={Slide}
        toastStyle={{
          marginTop: "25px",
          fontSize: "13px",
          padding: "8px 14px",
          borderRadius: "12px",
          minHeight: "unset",
          lineHeight: "1.3",
          fontWeight: 500,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      />
    </>
  );
};

export default App;
