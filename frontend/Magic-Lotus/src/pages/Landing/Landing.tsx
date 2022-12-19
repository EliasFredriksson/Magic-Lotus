import "./landing.scss";
import useFetch from "../../hooks/useFetch/useFetch";
import { IGetCardsRandomParams } from "../../services/scryfall/Cards.service";
import ICard from "../../models/scryfall/interfaces/ICard";
import Input from "../../components/Input/Input";
import { useState } from "react";

const Landing = () => {
  const [searchText, setSearchText] = useState("");

  const { isLoading, triggerFetch } = useFetch<
    IGetCardsRandomParams,
    any,
    ICard
  >({
    base: "SCRYFALL",
    method: "GET",
    route: "/cards/random",
  });

  return (
    <main id="landing-page">
      <h1>LANDING PAGE</h1>
      <button
        onClick={() => {
          triggerFetch();
        }}
      >
        FETCH
      </button>

      <Input
        type="text"
        placeholder="Search for cards"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
    </main>
  );
};

export default Landing;
