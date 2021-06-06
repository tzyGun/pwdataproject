import React from "react";
// import logo from "../../assets/food-onion.svg";
import logo from "../../assets/papaj.jpeg";

const Header = () => {
  return (
    <header className="app-header">

      <img src={logo} className="App-logo" alt="logo" />
      <p className="jezus">tak pan jezus powiedzial</p>
    </header>
  );
};

export default Header;
