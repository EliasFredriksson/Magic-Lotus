import "./landing.scss";
import useFetch from "../../hooks/useFetch/useFetch";
import {
  ROUTE_GET_CARDS_RANDOM,
  IGetCardsRandom,
} from "../../services/Cards.service";
import useUpdateEffect from "../../hooks/useUpdateEffect/useUpdateEffect";

const Landing = () => {
  const { isLoading, error, success, res, triggerFetch, abort } = useFetch<
    IGetCardsRandom,
    any
  >({
    method: "GET",
    route: ROUTE_GET_CARDS_RANDOM,
  });

  useUpdateEffect(() => {
    if (!isLoading) {
      console.log("RES: ", res);
    }

    // IF UNMOUNT, ABORT
    return () => {
      abort();
    };
  }, [isLoading]);

  return (
    <main className="App">
      <h1>LANDING PAGE</h1>
      <button
        onClick={() => {
          triggerFetch({
            params: {
              q: "Force of will",
            },
            data: null,
          });
        }}
      >
        FETCH
      </button>
    </main>
  );
};

export default Landing;
