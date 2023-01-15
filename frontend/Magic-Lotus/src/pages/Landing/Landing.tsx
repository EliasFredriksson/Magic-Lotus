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
import Account from "../../components/Navbar/Account/Account";
import useFetchRandomCard from "../../services/scryfall/cards/Cards.random.service";
import useUtility from "../../hooks/useUtility/useUtility";

const Landing = () => {
  const [searchText, setSearchText] = useState("");

  const { openStatusModal } = useUtility();
  const { search, isLoading } = useSearch();
  const { isLoggedIn } = useAuth();
  const { navigate } = useNavigate();

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
      <h1>Welcome to Magic Lotus!</h1>
      <Text size="m" align="center">
        <em>A Magic the Gathering search site powered by Scryfall</em>
      </Text>

      <Card>
        <form onSubmit={handleSearch} className="landing-form">
          <Input
            beforeDec={
              isLoading ? (
                <Spinner variant="pulse" size="medium" />
              ) : (
                <RxMagnifyingGlass />
              )
            }
            type="text"
            placeholder="Search for cards"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button type="submit" variant="secondary">
            <Text size="xl">Search!</Text>
          </Button>
        </form>
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
      </Card>
    </Main>
  );
};

export default Landing;
