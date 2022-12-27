import { useCallback, useEffect, useState } from "react";
import useFetch from "../useFetch/useFetch";
import useObjectState from "../useObjectState/useObjectState";
import IServiceResponse from "../../models/backend/types/MagicLotusResponse";
import ICatalog from "../../models/scryfall/interfaces/ICatalog";
import {
  GET_CATALOG_ABILITY_WORDS,
  GET_CATALOG_ARTIFACT_TYPES,
  GET_CATALOG_ARTIST_NAMES,
  GET_CATALOG_CARD_NAMES,
  GET_CATALOG_CREATURE_TYPES,
  GET_CATALOG_ENCHANTMENT_TYPES,
  GET_CATALOG_KEYWORD_ABILITIES,
  GET_CATALOG_KEYWORD_ACTIONS,
  GET_CATALOG_LAND_TYPES,
  GET_CATALOG_LOYALTIES,
  GET_CATALOG_PLANESWALKER_TYPES,
  GET_CATALOG_POWERS,
  GET_CATALOG_SPELL_TYPES,
  GET_CATALOG_WATERMARKS,
  GET_CATALOG_WORD_BANK,
} from "../../services/scryfall/Catalog.routes";
import CATALOG_ROUTES from "../../services/backend/Catalog.routes";

type LoadingState = {
  "card-names": boolean;
  "artist-names": boolean;
  "word-bank": boolean;
  "creature-types": boolean;
  "planeswalker-types": boolean;
  "land-types": boolean;
  "artifact-types": boolean;
  "enchantment-types": boolean;
  "spell-types": boolean;
  powers: boolean;
  loyalties: boolean;
  watermarks: boolean;
  "keyword-abilities": boolean;
  "keyword-actions": boolean;
  "ability-words": boolean;
};
type CatalogFetch = {
  category: keyof LoadingState;
  fetchCall: () => Promise<ICatalog>;
  abort: () => void;
};
const BLANK_LOADING_STATE: LoadingState = {
  "card-names": true,
  "artist-names": true,
  "word-bank": true,
  "creature-types": true,
  "planeswalker-types": true,
  "land-types": true,
  "artifact-types": true,
  "enchantment-types": true,
  "spell-types": true,
  powers: true,
  loyalties: true,
  watermarks: true,
  "keyword-abilities": true,
  "keyword-actions": true,
  "ability-words": true,
};

interface IProps {
  onError: (error: Error) => void;
}

const FETCH_CALLS_DELAY = 1000;

const useUpdateAllCatalogs = (
  props: IProps
): {
  done: boolean;
  isLoading: boolean;
  start: () => Promise<void>;
} => {
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchesLoading, setIsFetchesLoading] =
    useObjectState(BLANK_LOADING_STATE);

  // ==================== FETCH REQUEST BACKEND ====================
  const FetchStoreCatalog = useFetch<
    IServiceResponse<string>,
    { category: string; data: ICatalog }
  >({
    base: "BACKEND",
    route: CATALOG_ROUTES.POST_CATALOG(),
    method: "POST",
  });

  const storeCatalog = useCallback(
    async (category: string, catalog: ICatalog): Promise<boolean> => {
      const res = await FetchStoreCatalog.triggerFetch({
        body: {
          category,
          data: catalog,
        },
      });
      if (res.success) return true;
      else {
        props.onError(new Error(res.error));
        return false;
      }
    },
    []
  );

  const start = useCallback(async () => {
    setIsLoading(true);
    ALL_SCRYFALL_FETCH_CALLS.forEach(async (call, index) => {
      try {
        await new Promise((res) =>
          setTimeout(res, FETCH_CALLS_DELAY * (index + 1))
        );
        const res = await call.fetchCall();
        await storeCatalog(call.category, res);
        setIsFetchesLoading({
          [call.category]: false,
        });
      } catch (error) {
        props.onError(error as Error);
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (Object.values(isFetchesLoading).every((value) => value === false)) {
      setIsLoading(false);
      setDone(true);
    }
  }, [isFetchesLoading]);

  // ==================== FETCH REQUEST CONFIGS ====================
  const FetchCardnames = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_CARD_NAMES(),
    method: "GET",
  });
  const FetchArtistNames = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_ARTIST_NAMES(),
    method: "GET",
  });
  const FetchWordBank = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_WORD_BANK(),
    method: "GET",
  });
  const FetchCreatureTypes = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_CREATURE_TYPES(),
    method: "GET",
  });
  const FetchPlaneswalkerTypes = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_PLANESWALKER_TYPES(),
    method: "GET",
  });
  const FetchLandTypes = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_LAND_TYPES(),
    method: "GET",
  });
  const FetchArtifactTypes = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_ARTIFACT_TYPES(),
    method: "GET",
  });
  const FetchEnchantmentTypes = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_ENCHANTMENT_TYPES(),
    method: "GET",
  });
  const FetchSpellTypes = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_SPELL_TYPES(),
    method: "GET",
  });
  const FetchPowers = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_POWERS(),
    method: "GET",
  });
  const FetchLoyalties = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_LOYALTIES(),
    method: "GET",
  });
  const FetchWatermarks = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_WATERMARKS(),
    method: "GET",
  });
  const FetchKeywordAbilities = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_KEYWORD_ABILITIES(),
    method: "GET",
  });
  const FetchKeywordActions = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_KEYWORD_ACTIONS(),
    method: "GET",
  });
  const FetchAbilityWords = useFetch<ICatalog>({
    base: "SCRYFALL",
    route: GET_CATALOG_ABILITY_WORDS(),
    method: "GET",
  });
  const ALL_SCRYFALL_FETCH_CALLS: CatalogFetch[] = [
    {
      category: "card-names",
      fetchCall: FetchCardnames.triggerFetch,
      abort: FetchCardnames.abort,
    },
    {
      category: "artist-names",
      fetchCall: FetchArtistNames.triggerFetch,
      abort: FetchArtistNames.abort,
    },
    {
      category: "word-bank",
      fetchCall: FetchWordBank.triggerFetch,
      abort: FetchWordBank.abort,
    },
    {
      category: "creature-types",
      fetchCall: FetchCreatureTypes.triggerFetch,
      abort: FetchCreatureTypes.abort,
    },
    {
      category: "planeswalker-types",
      fetchCall: FetchPlaneswalkerTypes.triggerFetch,
      abort: FetchPlaneswalkerTypes.abort,
    },
    {
      category: "land-types",
      fetchCall: FetchLandTypes.triggerFetch,
      abort: FetchLandTypes.abort,
    },
    {
      category: "artifact-types",
      fetchCall: FetchArtifactTypes.triggerFetch,
      abort: FetchArtifactTypes.abort,
    },
    {
      category: "enchantment-types",
      fetchCall: FetchEnchantmentTypes.triggerFetch,
      abort: FetchEnchantmentTypes.abort,
    },
    {
      category: "spell-types",
      fetchCall: FetchSpellTypes.triggerFetch,
      abort: FetchSpellTypes.abort,
    },
    {
      category: "powers",
      fetchCall: FetchPowers.triggerFetch,
      abort: FetchPowers.abort,
    },
    {
      category: "loyalties",
      fetchCall: FetchLoyalties.triggerFetch,
      abort: FetchLoyalties.abort,
    },
    {
      category: "watermarks",
      fetchCall: FetchWatermarks.triggerFetch,
      abort: FetchWatermarks.abort,
    },
    {
      category: "keyword-abilities",
      fetchCall: FetchKeywordAbilities.triggerFetch,
      abort: FetchKeywordAbilities.abort,
    },
    {
      category: "keyword-actions",
      fetchCall: FetchKeywordActions.triggerFetch,
      abort: FetchKeywordActions.abort,
    },
    {
      category: "ability-words",
      fetchCall: FetchAbilityWords.triggerFetch,
      abort: FetchAbilityWords.abort,
    },
  ];
  // ===============================================================

  useEffect(() => {
    return () => {
      ALL_SCRYFALL_FETCH_CALLS.every((call) => {
        call.abort();
      });
      FetchStoreCatalog.abort();
    };
  }, []);

  return {
    done,
    isLoading,
    start,
  };
};

export default useUpdateAllCatalogs;
