import { useCallback, useState } from "react";
import { useFetchPostSymbol } from "../../services/backend/Symbol.service";
import ICardSymbol from "../../models/scryfall/interfaces/ICardSymbol";
import { useFetchSetsFromScryfall } from "../../services/scryfall/Sets.service";
import ISet from "../../models/scryfall/interfaces/ISet";
import { useFetchPostSet } from "../../services/backend/Sets.service";

interface IProps {
  onError: (error: Error) => void;
}

const FETCH_CALLS_DELAY = 100;
const useUpdateAllSets = (
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
  const FetchStoreSet = useFetchPostSet();
  // Scryfall
  const FetchScryfallSets = useFetchSetsFromScryfall();

  // Store symbol to backend
  const storeSet = useCallback(async (set: ISet): Promise<void> => {
    const res = await FetchStoreSet.triggerFetch({
      body: {
        set: set,
      },
    });
    if (res.object === "aborted") return;
    if (res.object === "magic_lotus_error") {
      props.onError(new Error(res.error));
      return;
    }
    return;
  }, []);

  const start = useCallback(async () => {
    setIsLoading(true);
    setDone(false);

    const scryfallRes = await FetchScryfallSets.triggerFetch();
    if (scryfallRes.object === "aborted") return;
    if (scryfallRes.object === "error") {
      props.onError(new Error(scryfallRes.details));
      return;
    }

    console.log("SCRYFALL RES: ", scryfallRes);

    let counter = 0;
    scryfallRes.data.forEach(async (set, index) => {
      try {
        await new Promise((res) =>
          setTimeout(res, FETCH_CALLS_DELAY * (index + 1))
        );
        await storeSet(set);
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

export default useUpdateAllSets;
