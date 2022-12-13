import "./landing.scss";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import { getCardsRandom } from "../../services/Cards.service";

const Landing = () => {
  const { isLoading, error, success, data, triggerFetch, abort } =
    useFetch<string>({
      initValue: "",
      serviceFunction: getCardsRandom,
    });

  useEffect(() => {
    if (!isLoading) {
      console.log("DATA: ", data);
    }

    return () => {};
  }, [isLoading]);

  return (
    <main className="App">
      <h1>LANDING PAGE</h1>
      <button
        onClick={() => {
          // triggerFetch();
        }}
      >
        FETCH
      </button>
    </main>
  );
};

export default Landing;
