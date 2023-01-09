import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import useSearch from "../../hooks/useSearch/useSearch";
import ICatalog, {
  BLANK_CATALOG,
} from "../../models/backend/interfaces/ICatalog";
import { useFetchGetTypesCatalogs } from "../../services/backend/Catalog.service";
import { ICardSearchParams } from "../../services/scryfall/cards/Cards.search.service";
import { GoCreditCard } from "react-icons/go";
import { VscSymbolColor } from "react-icons/vsc";
import "./search.scss";
import { TfiCrown, TfiText } from "react-icons/tfi";
import {
  IoFingerPrintOutline,
  IoShieldOutline,
  IoStarOutline,
} from "react-icons/io5";
import { BiCoinStack } from "react-icons/bi";
import { IFullTextParams } from "../../helpers/fullTextConverter/FullTextConverter";
import Dropdown from "../../components/Dropdown/Dropdown";
import Choice from "../../components/Choice/Choice";
import { CARD_TYPES, SUPER_TYPES } from "../../constants/CARD_TYPES";
import Button from "../../components/Button/Button";
import { useFetchManaSymbols } from "../../services/backend/Symbol.service";
import useUtility from "../../hooks/useUtility/useUtility";
import ISymbol from "../../models/backend/interfaces/ISymbol";

// NEEDED FOR CATEGORIES IN DROPDOWN
type DataCategory = {
  id: string;
  name?: undefined;
  title: string;
  meta?: undefined;
};
type DataEntry = {
  id: string;
  name: string;
  title?: undefined;
  meta?: any;
};
type Data = DataEntry | DataCategory;

type IInputState = {
  [Property in keyof Required<IFullTextParams>]: string;
};

const Search = () => {
  const { openStatusModal } = useUtility();
  const { search } = useSearch();

  // DATA
  const [catalogs, setCatalogs] = useState<Data[]>([]);
  const [manaSymbols, setManaSymbols] = useState<Data[]>([]);

  // FETCH
  const getCatalogs = useFetchGetTypesCatalogs();
  const getManaSymbols = useFetchManaSymbols();

  // INPUT STATES
  const [searchParams, setSearchParams] = useObjectState<IInputState>({
    q: "",
    oracle: "",
    color: "",
    id: "",
    type: "",
    fo: "",
    keyword: "",
    mana: "",
    manavalue: "",
    cmc: "",
    devotion: "",
    produces: "",
    power: "",
    toughness: "",
    powtou: "",
    loyalty: "",
    include: "",
    rarity: "",
    set: "",
    cn: "",
    block: "",
    st: "",
    cube: "",
    format: "",
    banned: "",
    restricted: "",
    tix: "",
    usd: "",
    eur: "",
    cheapest: "",
    artist: "",
    flavor: "",
    watermark: "",
    border: "",
    stamp: "",
    frame: "",
    game: "",
    year: "",
    art: "",
    function: "",
    sets: "",
    papersets: "",
    paperprints: "",
    lang: "",
    unique: "",
    has: "",
    new: "",
    in: "",
    is: "",
  });

  const setColors = useCallback(
    (data: { colors?: string; condition?: string }) => {
      console.log("COLORS: ", data);
    },
    []
  );

  useEffect(() => {
    const init = async () => {
      // ############################### CATALOGS ###############################
      const catRes = await getCatalogs.triggerFetch();
      if (catRes.object === "aborted") return;
      if (catRes.object === "magic_lotus_error") {
        openStatusModal(catRes.error);
        return;
      }
      let types: Data[] = [];
      catRes.data.map((cat, index) => {
        // CONVERT CATEGORY NAME (ex: land-types) TO CAPITALIZED Land Types.
        const words = cat.category.replace("-", " ").split(" ");
        const title = words
          .map((word) => {
            if (word.length > 0)
              return word[0].toUpperCase() + word.substring(1);
          })
          .join(" ");
        const categoryTitle = {
          id: `${cat.category}-${index}`,
          title: title,
        };
        // ################################################################
        // CREATE "Data" OBJECTS OF ALL STRINGS FROM THE CATALOG
        const mappedCat = cat.data.map((value, innerIndex) => {
          return {
            id: `${index}-${innerIndex}-${value}`,
            name: value,
          };
        });
        // ADD THE CATEGORY TITLE AND MAPPED ENTRIES TO FINAL LIST
        types = [...types, ...mappedCat, categoryTitle];
      });
      types.reverse();
      setCatalogs([
        {
          id: "CARD_TYPES",
          title: "Card Types",
        },
        ...CARD_TYPES,
        {
          id: "SUPER_TYPES",
          title: "Super Types",
        },
        ...SUPER_TYPES,
        ...types,
      ]);
      // #########################################################################
      // ############################### MANA SYMBOLS ###############################
      const manaRes = await getManaSymbols.triggerFetch();
      if (manaRes.object === "aborted") return;
      if (manaRes.object === "magic_lotus_error") {
        openStatusModal(manaRes.error);
        return;
      }
      // Convert recived mana to Data objects.
      const mana: Data[] = manaRes.data.reverse().map((symbol, i) => {
        return {
          id: `${symbol.symbol}-${i}`,
          name: `${symbol.symbol}  ${symbol.english}`,
          meta: symbol.symbol,
        };
      });
      setManaSymbols(mana);
      // ###########################################################################
    };
    init();
  }, []);

  const createText = useCallback(
    (title: string) => <Text size="l">{title}</Text>,
    []
  );

  useEffect(() => {
    console.table(searchParams);
  }, [searchParams]);

  return (
    <Main id="search-page">
      <div className="middle">
        <Text family="heading" size="xxl">
          Advanced Search
        </Text>
        <Card>
          {/* CARD NAME */}
          <div className="search-field">
            <div className="label">
              <GoCreditCard className="icon" />
              {createText("Card Name")}
            </div>
            <Input
              placeholder={`Any words in the name, e.g. "Fire"`}
              type="text"
              value={searchParams.q}
              onChange={(e) => {
                setSearchParams({
                  q: e.target.value,
                });
              }}
            />
          </div>
          {/* TEXT */}
          <div className="search-field">
            <div className="label">
              <TfiText className="icon" />
              {createText("Text")}
            </div>
            <Input
              placeholder={`Any text, e.g. "draw a card"`}
              type="text"
              value={searchParams.oracle}
              onChange={(e) => {
                setSearchParams({
                  oracle: e.target.value,
                });
              }}
            />
          </div>
          {/* TYPE LINE */}
          <div className="search-field">
            <div className="label">
              <IoFingerPrintOutline className="icon" />
              {createText("Type Line")}
            </div>

            <Dropdown
              multiChoice
              searchable
              placeholder="Enter a type or choose from the list"
              data={catalogs}
              onSelect={(active) => {}}
              menuHeight="50rem"
              menuPosition="relative"
            />
            <Choice
              variant="checkbox"
              data={[
                {
                  id: "allow-partial-types",
                  name: "Allow partial types",
                },
              ]}
              onChange={(choices) => {}}
            />
          </div>
          {/* COLORS */}
          <div className="search-field">
            <div className="label">
              <VscSymbolColor className="icon" />
              {createText("Colors")}
            </div>
            <Choice
              variant="checkbox"
              data={[
                {
                  id: "1",
                  name: "White",
                  meta: "{W}",
                },
                {
                  id: "2",
                  name: "Blue",
                  meta: "{U}",
                },
                {
                  id: "3",
                  name: "Black",
                  meta: "{B}",
                },
                {
                  id: "4",
                  name: "Red",
                  meta: "{R}",
                },
                {
                  id: "5",
                  name: "Green",
                  meta: "{G}",
                },
                {
                  id: "6",
                  name: "Colorless",
                },
              ]}
              onChange={(choices) => {
                console.log("ACTIVE: ", choices);
                setColors({
                  colors: choices.map((choice) => choice.meta).join(""),
                });
              }}
            />

            <Dropdown
              placeholder="Choose a color criteria."
              data={[
                {
                  id: "1",
                  name: "Exactly these colors",
                  meta: ":",
                },
                {
                  id: "2",
                  name: "Including these colors",
                  meta: ">=",
                },
                {
                  id: "3",
                  name: "At most these colors",
                  meta: "<=",
                },
              ]}
              onSelect={(entries) => {
                setColors({
                  condition: entries[0].meta,
                });
              }}
              startValue={[{ id: "1", name: "Exactly these colors" }]}
            />
          </div>
          {/* COMMANDER */}
          <div className="search-field">
            <div className="label">
              <IoShieldOutline className="icon" />
              {createText("Commander")}
            </div>
            <Choice
              variant="checkbox"
              data={[
                {
                  id: "1",
                  name: "White",
                  meta: "{W}",
                },
                {
                  id: "2",
                  name: "Blue",
                  meta: "{U}",
                },
                {
                  id: "3",
                  name: "Black",
                  meta: "{B}",
                },
                {
                  id: "4",
                  name: "Red",
                  meta: "{R}",
                },
                {
                  id: "5",
                  name: "Green",
                  meta: "{G}",
                },
                {
                  id: "6",
                  name: "Colorless",
                },
              ]}
              onChange={(choices) => {
                console.log("ACTIVE: ", choices);
              }}
            />
          </div>

          {/* MANA COST */}
          <div className="search-field">
            <div className="label">
              <BiCoinStack className="icon" />
              {createText("Mana Cost")}
            </div>

            <Dropdown
              searchable
              multiChoice
              placeholder="Add symbol"
              menuPosition="relative"
              data={manaSymbols}
              onSelect={(entries) => {
                setSearchParams({
                  mana: entries.map((data) => data.meta).join(""),
                });
              }}
            />
          </div>
          {/* STATS */}
          {/* FORMATS */}

          {/* SETS / BLOCKS */}
          <div className="search-field">
            <div className="label">
              <TfiCrown className="icon" />
              {createText("Sets")}
            </div>

            <Dropdown
              multiChoice
              searchable
              placeholder="Enter a type or choose from the list"
              menuPosition="relative"
              data={[
                {
                  id: "1",
                  name: "Test",
                },
                {
                  id: "2",
                  name: "mat",
                },
                {
                  id: "3",
                  name: "apa",
                },
                {
                  id: "4",
                  name: "höna",
                },
                {
                  id: "5",
                  name: "knasig",
                },
                {
                  id: "6",
                  name: "creature",
                },
                {
                  id: "7",
                  name: "artifact",
                },
                {
                  id: "8",
                  name: "instant",
                },
                {
                  id: "9",
                  name: "mox",
                },
                {
                  id: "10",
                  name: "flying",
                },
                {
                  id: "11",
                  name: "hexproof",
                },
              ]}
              onSelect={(active) => {}}
            />
          </div>
          {/* RARITY */}
          <div className="search-field rarity">
            <div className="label">
              <IoStarOutline className="icon" />
              {createText("Rarity")}
            </div>
            <Choice
              variant="checkbox"
              data={[
                {
                  id: "1",
                  name: "Common",
                },
                {
                  id: "2",
                  name: "Uncommon",
                },
                {
                  id: "3",
                  name: "Rare",
                },
                {
                  id: "4",
                  name: "Mythic",
                },
              ]}
              onChange={(choices) => {
                console.log("RARITY: ", choices);
              }}
            />
          </div>
          {/* CRITERIA */}
          {/* PRICES */}
          {/* ARTIST */}
          {/* FLAVOR TEXT */}
          {/* LORE FINDER */}
          {/* LANGUAGE */}
          {/* PREFERENCES */}
        </Card>
      </div>

      <div className="submit-wrapper">
        <Button fontSize="xxxl" variant="success">
          Search!
        </Button>
      </div>
    </Main>
  );
};

export default Search;
