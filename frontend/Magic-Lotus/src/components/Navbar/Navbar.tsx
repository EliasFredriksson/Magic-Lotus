import "./navBar.scss";
import { FormEvent, useCallback, useState } from "react";
// COMPONENTS
import Button from "../Button/Button";
import Collapse from "../Collapse/Collapse";
import Text from "../Text/Text";
import Input from "../Input/Input";
import Account from "./Account/Account";
import Spinner from "../Spinner/Spinner";
// HOOKS
import useAuth from "../../hooks/useAuth/useAuth";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import useBoolean from "../../hooks/useBoolean/useBoolean";
import useSearch from "../../hooks/useSearch/useSearch";
// ICONS
import { FaHome } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoClose, IoMenu } from "react-icons/io5";
import { isEmpty } from "../../helpers/StringValidations";

const Navbar = () => {
  const { navigate } = useNavigate();
  const { credentials, isLoggedIn } = useAuth();
  const { breakpoints } = useScreenSize();
  const { value: isMenuOpen, on, off } = useBoolean();
  const { search, latestSearch, isLoading } = useSearch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!isEmpty(searchTerm)) {
        search({
          q: searchTerm,
        });
      }
    },
    [searchTerm]
  );

  const searchForm = (
    <div className="middle">
      <form onSubmit={handleSubmit} className="search-form">
        <Input
          beforeDec={
            isLoading ? (
              <Spinner variant="pulse" size="small" />
            ) : (
              <RxMagnifyingGlass />
            )
          }
          type="text"
          placeholder="Search for cards"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          fontSize={breakpoints.IS_MOBILE ? "xxl" : "l"}
        />
        <button type="submit" className="nav-submit-button">
          Submit
        </button>
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

  const adminButton = credentials.role === "admin" && (
    <Button
      fontSize="m"
      onClick={() => {
        off();
        navigate("/admin");
      }}
    >
      <Text size={breakpoints.IS_MOBILE ? "xxl" : "l"}>Admin</Text>
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
                navigate("/search");
              }}
            >
              Advanced search
            </Button>
            <Button
              variant="link"
              onClick={() => {
                off();
                navigate("/");
              }}
            >
              Home
            </Button>
          </Collapse>
        </>
      ) : (
        // DESKTOP MENU
        <>
          <Button
            className="home-button"
            onClick={() => {
              off();
              navigate("/");
            }}
            fontSize="xl"
          >
            <FaHome />
            <Text size={breakpoints.IS_MOBILE ? "xxl" : "l"}>Home</Text>
          </Button>
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
