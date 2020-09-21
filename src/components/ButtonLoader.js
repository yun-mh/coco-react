import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ButtonLoader = ({ color = "rgb(255, 255, 255)", size = 24 }) => {
  return <ClipLoader color={color} size={size} />;
};

export default ButtonLoader;
