import logo from "../../assets/bitcoin_logo.svg";

const Header = () => {
  return (
    <header className="app-header pt-10 pb-10">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  );
};

export default Header;
