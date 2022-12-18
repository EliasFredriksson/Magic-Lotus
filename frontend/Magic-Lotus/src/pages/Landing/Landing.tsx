import "./landing.scss";
import useFetch from "../../hooks/useFetch/useFetch";
import { IGetCardsRandomParams } from "../../services/Cards.service";
import ICard from "../../models/interfaces/ICard";

const Landing = () => {
  const { isLoading, triggerFetch } = useFetch<
    IGetCardsRandomParams,
    any,
    ICard
  >({
    base: "STRAPI",
    method: "GET",
    route: "/catalogs",
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
    </main>
  );
};

export default Landing;
