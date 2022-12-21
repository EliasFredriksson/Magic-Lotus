import "./landing.scss";
import useFetch from "../../hooks/useFetch/useFetch";
import Input from "../../components/Input/Input";
import { FormEvent, useCallback, useState } from "react";
import IPaginated from "../../models/scryfall/interfaces/IPaginated";
import ICard from "../../models/scryfall/interfaces/ICard";
import ICardSearchParams, {
  ROUTE_GET_CARDS_SEARCH,
} from "../../services/scryfall/cardsSearch";
import Button from "../../components/Button/Button";
import { RxMagnifyingGlass } from "react-icons/rx";
import { isEmpty } from "../../helpers/StringValidations";

const Landing = () => {
  const [searchText, setSearchText] = useState("");

  const { isLoading, triggerFetch } = useFetch<
    IPaginated<ICard[]>,
    null,
    ICardSearchParams
  >({
    route: ROUTE_GET_CARDS_SEARCH,
    base: "SCRYFALL",
    method: "GET",
  });

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!isEmpty(searchText)) {
        const res = await triggerFetch({
          params: {
            q: searchText,
          },
        });

        console.log("RES: ", res);
      }
    },
    [searchText]
  );

  return (
    <main id="landing-page">
      <h1>Welcome to Magic Lotus!</h1>
      <em>
        A <cite>Magic the Gathering</cite> card search website based on{" "}
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
    </main>
  );
};

export default Landing;
