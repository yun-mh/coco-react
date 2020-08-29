import React from "react";
import Routes from "./components/Routes";
import { useQuery } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IS_LOGGED_IN } from "./queries/Auth/AuthQueries";

function App() {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <>
      <Router>
        <Routes isLoggedIn={data?.isLoggedIn} />
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default App;
