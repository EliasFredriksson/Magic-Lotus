import "./landing.scss";
import useFetch from "../../hooks/useFetch/useFetch";
import {
  ROUTE_GET_CARDS_RANDOM,
  IGetCardsRandomParams,
  IGetCardsRandomResult,
} from "../../services/Cards.service";
import { useEffect } from "react";
import ICard from "../../models/interfaces/ICard";

const Landing = () => {
  const { isLoading, triggerFetch, abort } = useFetch<
    IGetCardsRandomParams,
    ICard
  >({
    method: "GET",
    route: ROUTE_GET_CARDS_RANDOM,
    onFetched: (res) => {
      console.log("RES: ", res);
    },
    onError: (error) => {
      console.log("ERROR: ", error);
    },
  });

  useEffect(() => {
    return () => {
      abort();
    };
  }, []);

  return (
    <main className="App">
      <h1>LANDING PAGE</h1>
      <button
        onClick={() => {
          triggerFetch({
            params: {
              q: "Force of will",
            },
          });
        }}
      >
        FETCH
      </button>
    </main>
  );
};

export default Landing;
