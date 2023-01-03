import "./navBar.scss";

import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth/useAuth";
import Input from "../Input/Input";
import { FormEvent, useCallback, useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import { FaHome } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import useRouterContext from "../../hooks/useNavigate/useNavigate";
import Collapse from "../Collapse/Collapse";
import useBoolean from "../../hooks/useBoolean/useBoolean";
import Text from "../Text/Text";
import { IoClose, IoMenu } from "react-icons/io5";
import Account from "./Account/Account";
import useSearch from "../../hooks/useSearch/useSearch";
import { isEmpty } from "../../helpers/StringValidations";

const Navbar = () => {
  const { navigate } = useRouterContext();
  const { credentials, isLoggedIn } = useAuth();
  const { breakpoints } = useScreenSize();
  const { value: isMenuOpen, on, off } = useBoolean();
  const { search, latestSearch } = useSearch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!isEmpty(searchTerm) && searchTerm !== latestSearch.query.q) {
        search({
          q: searchTerm,
          order: "color",
        });
      }
    },
    [searchTerm]
  );

  const searchForm = (
    <div className="middle">
      <form onSubmit={handleSubmit} className="search-form">
        <Input
          beforeDec={<RxMagnifyingGlass />}
          type="text"
          placeholder="Search for cards"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {!breakpoints.IS_MOBILE && (
          <Button
            type="button"
            variant="secondary"
            fontSize="m"
            onClick={() => {
              off();
              navigate("/search");
            }}
          >
            Advanced search
          </Button>
        )}
      </form>
    </div>
  );

  const loginLogoutButton = !isLoggedIn && (
    <Button
      onClick={() => {
        off();
        navigate("/login");
      }}
    >
      Login
    </Button>
  );

  const homeButton = (
    <Button
      className="home-button"
      onClick={() => {
        off();
        navigate("/");
      }}
      fontSize="xl"
    >
      {!breakpoints.IS_MOBILE ? <FaHome /> : "Start"}
    </Button>
  );

  const adminButton = credentials.role === "admin" && (
    <Button
      fontSize="m"
      onClick={() => {
        off();
        navigate("/admin");
      }}
    >
      Admin
    </Button>
  );

  return (
    <nav className="main-navbar">
      {breakpoints.IS_MOBILE ? (
        // MOBILE MENU
        <>
          <div
            className={`background-effect${isMenuOpen ? " open" : " closed"}`}
            onClick={off}
          />
          <Button onClick={on} fontSize="xxxl">
            <IoMenu />
          </Button>
          {searchForm}
          <Collapse
            direction="horizontal"
            isOpen={isMenuOpen}
            className="mobile-nav"
            openSize="80vw"
          >
            <div className="top">
              <Text family="heading" size="xxl">
                Menu
              </Text>
              <Button variant="icon" onClick={off} fontSize="xxxl">
                <IoClose />
              </Button>
            </div>
            {loginLogoutButton}
            <Account closeMenu={off} />
            {adminButton}
            <Button
              variant="link"
              onClick={() => {
                off();
                navigate("/admin");
              }}
            >
              Admin
            </Button>
            <Button
              variant="link"
              onClick={() => {
                off();
                navigate("/search");
              }}
            >
              Advanced search
            </Button>
            {homeButton}
          </Collapse>
        </>
      ) : (
        // DESKTOP MENU
        <>
          {homeButton}
          {searchForm}

          {loginLogoutButton}
          {adminButton}
          <Account />
        </>
      )}
    </nav>
  );
};

export default Navbar;
