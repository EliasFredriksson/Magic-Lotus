import "./navBar.scss";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth/useAuth";
import Input from "../Input/Input";
import { FormEvent, useCallback, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import { FaHome } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const { breakpoints } = useScreenSize();

  const { credentials, logout } = useAuth();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMITTED IN NAVBAR!");
  }, []);

  return (
    <nav className="main-navbar">
      <div className="left">
        <Button
          className="home-button"
          onClick={() => navigate("/")}
          fontSize="xxl"
        >
          <FaHome />
        </Button>
      </div>
      <div className="middle">
        <form onSubmit={handleSubmit}>
          <Input
            beforeDec={<RxMagnifyingGlass />}
            afterDec={<RxMagnifyingGlass />}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </form>
      </div>
      {(breakpoints.IS_LAPTOP || breakpoints.IS_DESKTOP) && (
        <div className="right">
          {credentials.role !== "public" ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
