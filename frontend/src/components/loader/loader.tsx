import React from "react";
import loader from "../../assets/loader.svg";

const Loader = () => {
  return (
    <div>
      <img src={loader} alt="loader"></img>
      <div>Data Is Loading.....</div>
    </div>
  );
};

export default Loader;
