import react from "react";
import Login from "./login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
