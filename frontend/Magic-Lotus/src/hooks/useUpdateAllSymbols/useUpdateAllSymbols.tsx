import { useCallback, useState } from "react";
import { useFetchSymbology } from "../../services/scryfall/CardSymbols.service";
import { useFetchPostSymbol } from "../../services/backend/Symbol.service";
import ICardSymbol from "../../models/scryfall/interfaces/ICardSymbol";

interface IProps {
  onError: (error: Error) => void;
}

const FETCH_CALLS_DELAY = 500;
const useUpdateAllSymbols = (
  props: IProps
): {
  done: boolean;
  isLoading: boolean;
  start: () => Promise<void>;
} => {
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ==================== FETCH REQUEST ====================
  // Backend
  const FetchStoreSymbol = useFetchPostSymbol();
  // Scryfall
  const FetchScryfallSymbols = useFetchSymbology();

  // Store symbol to backend
  const storeSymbol = useCallback(
    async (symbol: ICardSymbol): Promise<void> => {
      const res = await FetchStoreSymbol.triggerFetch({
        body: {
          symbol: symbol,
        },
      });
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        props.onError(new Error(res.error));
        return;
      }
      return;
    },
    []
  );

  const start = useCallback(async () => {
    setIsLoading(true);
    setDone(false);

    const scryfallRes = await FetchScryfallSymbols.triggerFetch();
    if (scryfallRes.object === "aborted") return;
    if (scryfallRes.object === "error") {
      props.onError(new Error(scryfallRes.details));
      return;
    }

    console.log("SCRYFALL RES: ", scryfallRes);

    let counter = 0;
    scryfallRes.data.forEach(async (symbol, index) => {
      try {
        await new Promise((res) =>
          setTimeout(res, FETCH_CALLS_DELAY * (index + 1))
        );
        await storeSymbol(symbol);
      } catch (error) {
        props.onError(error as Error);
      }
      counter++;
      if (counter >= scryfallRes.data.length) {
        setIsLoading(false);
        setDone(true);
      }
    });
  }, []);

  return {
    done,
    isLoading,
    start,
  };
};

export default useUpdateAllSymbols;
