import "./landing.scss";
import Input from "../../components/Input/Input";
import { FormEvent, useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import { RxMagnifyingGlass } from "react-icons/rx";
import { isEmpty } from "../../helpers/StringValidations";
import Main from "../../components/Main/Main";
import useSearch from "../../hooks/useSearch/useSearch";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import Card from "../../components/Card/Card";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useAuth from "../../hooks/useAuth/useAuth";
import useFetchRandomCard from "../../services/scryfall/cards/Cards.random.service";
import useUtility from "../../hooks/useUtility/useUtility";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import { Seperator } from "../../components/Seperator/Seperator";

const Landing = () => {
  const [searchText, setSearchText] = useState("");

  const { openStatusModal } = useUtility();
  const { search, isLoading } = useSearch();
  const { isLoggedIn } = useAuth();
  const { navigate } = useNavigate();
  const { breakpoints } = useScreenSize();

  const fetchRandomCard = useFetchRandomCard();

  const handleRandomCard = useCallback(async () => {
    const res = await fetchRandomCard.triggerFetch();
    if (res.object === "aborted") return;
    if (res.object === "network_error" || res.object === "unknown_error") {
      openStatusModal(res.error);
      return;
    }
    if (res.object === "error") {
      openStatusModal(res.details);
      return;
    }
    navigate(`card/${res.id}`);
  }, []);

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isEmpty(searchText)) {
        search({
          q: searchText,
          order: "name",
        });
      }
    },
    [searchText]
  );

  return (
    <Main id="landing-page">
      <Text as={breakpoints.IS_MOBILE ? "h3" : "h2"} align="center">
        Welcome to Magic Lotus!
      </Text>
      <Text as="em" align="center">
        A Magic the Gathering search site powered by Scryfall
      </Text>

      <Card>
        <form onSubmit={handleSearch} className="landing-form">
          <Input
            className="search-input"
            beforeDec={<RxMagnifyingGlass />}
            type="text"
            placeholder="Search for cards"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            fontSize={breakpoints.IS_MOBILE ? "l" : "xxl"}
          />
          <Button
            type="submit"
            variant="secondary"
            fontSize={breakpoints.IS_MOBILE ? "l" : "xxl"}
          >
            {isLoading ? <Spinner variant="pulse" size="medium" /> : "Search!"}
          </Button>
        </form>
        <Button
          type="button"
          variant="link"
          onClick={() => {
            navigate("/search");
          }}
        >
          <Text size={breakpoints.IS_MOBILE ? "xl" : "l"}>Advanced Search</Text>
        </Button>
        <Seperator direction="ver" />
        {isLoggedIn ? (
          <>
            <Button
              variant="link"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Go to my profile
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}

        <Button variant="link" onClick={handleRandomCard}>
          {fetchRandomCard.isLoading ? (
            <Spinner variant="pulse" size="medium" />
          ) : (
            "Take me to a random card!"
          )}
        </Button>
        <Button variant="link" onClick={handleRandomCard}>
          Advanced search
        </Button>
      </Card>
    </Main>
  );
};

export default Landing;
