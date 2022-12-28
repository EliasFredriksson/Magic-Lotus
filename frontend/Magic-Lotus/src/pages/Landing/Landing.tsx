import "./landing.scss";
import Input from "../../components/Input/Input";
import { FormEvent, useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import { RxMagnifyingGlass } from "react-icons/rx";
import { isEmpty } from "../../helpers/StringValidations";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import Main from "../../components/Main/Main";
import useRouterContext from "../../hooks/useRouterContext/useRouterContext";

const Landing = () => {
  const { navigate } = useRouterContext();
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!isEmpty(searchText)) {
        const query = {
          q: searchText,
          order: "color",
        };

        navigate({
          pathname: "/results",
          search: convertObjectToQuery(query),
        });
      }
    },
    [searchText]
  );

  return (
    <Main id="landing-page">
      <h1>Welcome to Magic Lotus!</h1>
      <em>
        A <cite>Magic the Gathering</cite> card search website powered by{" "}
        <cite>Scryfall</cite>
      </em>

      <form onSubmit={handleSearch} className="landing-form">
        <Input
          type="text"
          placeholder="Search for cards"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <Button type="submit">
          <RxMagnifyingGlass />
        </Button>
      </form>
    </Main>
  );
};

export default Landing;
