import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="shadow pb-1">
        <h1 className="App-title ">Fibonacci Calculator</h1>
        <Link to="/" className="link-secondary">
          Home
        </Link>
        {"  "}

        <Link to="/how_it_works" className="link-secondary mx-2">
          How it works
        </Link>
      </header>
      <p></p>
    </>
  );
};
