import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = ({ color = "rgb(118, 198, 188)", size = 60 }) => {
  return <PuffLoader color={color} size={size} />;
};

export default Loader;
