import "./landing.scss";
import Input from "../../components/Input/Input";
import { FormEvent, useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import { RxMagnifyingGlass } from "react-icons/rx";
import { isEmpty } from "../../helpers/StringValidations";
import Main from "../../components/Main/Main";
import useSearch from "../../hooks/useSearch/useSearch";
import Loader from "../../components/Loader/Loader";

const Landing = () => {
  const [searchText, setSearchText] = useState("");

  const { search } = useSearch();

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isEmpty(searchText)) {
        search({
          q: searchText,
          order: "color",
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
        <Button type="submit" variant="secondary">
          <RxMagnifyingGlass />
        </Button>
      </form>
    </Main>
  );
};

export default Landing;
