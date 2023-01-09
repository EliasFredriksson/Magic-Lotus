import "./search.scss";
import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import Dropdown from "../../components/Dropdown/Dropdown";
import Choice from "../../components/Choice/Choice";
import useSearch from "../../hooks/useSearch/useSearch";
import useUtility from "../../hooks/useUtility/useUtility";
import { useFetchManaSymbols } from "../../services/backend/Symbol.service";
import { useFetchGetTypesCatalogs } from "../../services/backend/Catalog.service";
import { GoCreditCard } from "react-icons/go";
import { VscSymbolColor } from "react-icons/vsc";
import { TfiCrown, TfiText } from "react-icons/tfi";
import {
  IoFingerPrintOutline,
  IoShieldOutline,
  IoStarOutline,
} from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { BiCoinStack } from "react-icons/bi";
import { CARD_TYPES, SUPER_TYPES } from "../../constants/CARD_TYPES";
import Button from "../../components/Button/Button";
import {
  EQUAL,
  IS,
  LARGER_OR_EQUAL,
  LARGER_THAN,
  NOT_EQUAL,
  SMALLER_OR_EQUAL,
  SMALLER_THAN,
} from "../../constants/FILTER_CONDITIONS";
import { Seperator } from "../../components/Seperator/Seperator";
import { FiLayers } from "react-icons/fi";

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

const COLOR_CONDITION_START_VALUE = [{ id: "1", name: "Exactly these colors" }];
const MANA_COST_START_VALUE = [{ id: "1", name: "Exactly this cost" }];
const STATS_TARGET_START_VALUE = [{ id: "1", name: "Mana Value" }];

const Search = () => {
  const { openStatusModal } = useUtility();
  const { search } = useSearch();

  // DATA
  const [catalogs, setCatalogs] = useState<Data[]>([]);
  const [manaSymbols, setManaSymbols] = useState<Data[]>([]);

  // FETCH
  const getCatalogs = useFetchGetTypesCatalogs();
  const getManaSymbols = useFetchManaSymbols();

  // ################################### INPUT STATES ###################################
  // Card name
  const [cardName, setCardName] = useState("");
  // Oracle text
  const [cardText, setCardText] = useState("");
  // Card types
  const [typeLine, setTypeLine] = useState<string[]>([]);
  const [allowPartial, setAllowPartial] = useState(false);
  // Card colors
  const [cardColors, setCardColors] = useState<string>("");
  const [colorCondition, setColorCondition] = useState(IS);
  // Commander
  const [commanderColors, setCommanderColors] = useState<string>("");
  // Mana const
  const [manaCost, setManaCost] = useState("");
  const [manaCondition, setManaCondition] = useState(IS);
  // Stats
  const [statTarget, setStatTarget] = useState("cmc");
  const [statCondition, setStatCondition] = useState("");
  const [statGoal, setStatGoal] = useState("");
  // Formats
  // Sets / Blocks
  // Rarity
  // Criteria
  // Prices
  // Artists
  // Flavor text
  // Lore finder
  // Language
  // Preferences

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
    console.clear();
    console.log("\n\nCARD NAME:\t", cardName);
    console.log("CARD TEXT:\t", cardText);
    console.log("CARD TYPES:\t", typeLine, "\tALLOW PARTIAL: ", allowPartial);
    console.log(
      "CARD COLORS:\t",
      cardColors,
      "\tCOLOR CONDITION: ",
      colorCondition
    );
    console.log("COMMANDER:\t", commanderColors);
    console.log("MANA COST:\t", manaCost, "\tMANA CONDITION:\t", manaCondition);
    console.log("STATS:\t", statTarget, statCondition, statGoal);
  }, [
    cardName,
    cardText,
    typeLine,
    allowPartial,
    cardColors,
    colorCondition,
    commanderColors,
    manaCost,
    manaCondition,
    statTarget,
    statCondition,
    statGoal,
  ]);

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
              value={cardName}
              onChange={(e) => {
                setCardName(e.target.value);
              }}
            />
          </div>
          <Seperator direction="ver" />
          {/* TEXT */}
          <div className="search-field">
            <div className="label">
              <TfiText className="icon" />
              {createText("Text")}
            </div>
            <Input
              placeholder={`Any text, e.g. "draw a card"`}
              type="text"
              value={cardText}
              onChange={(e) => {
                setCardText(e.target.value);
              }}
            />
          </div>
          <Seperator direction="ver" />

          {/* TYPE LINE */}
          <div className="search-field type">
            <div className="label">
              <IoFingerPrintOutline className="icon" />
              {createText("Type Line")}
            </div>

            <Dropdown
              multiChoice
              searchable
              placeholder="Enter a type or choose from the list"
              data={catalogs}
              onSelect={(active) => {
                setTypeLine(
                  active.map((type) =>
                    type.name ? `t:${type.name.toLowerCase()}` : ""
                  )
                );
              }}
              menuHeight="50rem"
              menuPosition="relative"
            />

            <div className="inner padded">
              <Choice
                variant="checkbox"
                data={[
                  {
                    id: "allow-partial-types",
                    name: "Allow partial types",
                  },
                ]}
                onChange={(choices) => {
                  choices[0] ? setAllowPartial(true) : setAllowPartial(false);
                }}
              />

              <Text size="xs">
                Choose any card type, supertype, or subtypes to match.
              </Text>
            </div>
          </div>
          <Seperator direction="ver" />

          {/* COLORS */}
          <div className="search-field colors">
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
                  meta: "w",
                },
                {
                  id: "2",
                  name: "Blue",
                  meta: "u",
                },
                {
                  id: "3",
                  name: "Black",
                  meta: "b",
                },
                {
                  id: "4",
                  name: "Red",
                  meta: "r",
                },
                {
                  id: "5",
                  name: "Green",
                  meta: "g",
                },
                {
                  id: "6",
                  name: "Colorless",
                  meta: "c",
                },
              ]}
              onChange={(choices) => {
                setCardColors(
                  `${choices.map((choice) => `${choice.meta}`).join("")}`
                );
              }}
            />

            <div className="inner">
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
                  setColorCondition(entries[0]?.meta ? entries[0].meta : ":");
                }}
                startValue={COLOR_CONDITION_START_VALUE}
              />
            </div>
          </div>
          <Seperator direction="ver" />

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
                  meta: "w",
                },
                {
                  id: "2",
                  name: "Blue",
                  meta: "u",
                },
                {
                  id: "3",
                  name: "Black",
                  meta: "b",
                },
                {
                  id: "4",
                  name: "Red",
                  meta: "r",
                },
                {
                  id: "5",
                  name: "Green",
                  meta: "g",
                },
                {
                  id: "6",
                  name: "Colorless",
                  meta: "c",
                },
              ]}
              onChange={(choices) => {
                setCommanderColors(
                  `${choices.map((choice) => `${choice.meta}`).join("")}`
                );
              }}
            />
          </div>
          <Seperator direction="ver" />

          {/* MANA COST */}
          <div className="search-field mana-cost">
            <div className="label">
              <BiCoinStack className="icon" />
              {createText("Mana Cost")}
            </div>

            <div className="wrapper">
              <Input
                value={manaCost}
                type="text"
                placeholder='Any mana symbols, e.g. "{W}{W}"'
                onChange={(e) => setManaCost(e.target.value)}
              />
              <Dropdown
                picker
                stayOpenOnSelect={true}
                placeholder="Add symbol"
                data={manaSymbols}
                onSelect={(entries) => {
                  setManaCost((prev) => prev + entries[0].meta);
                }}
              />
              <Dropdown
                placeholder="Choose a mana cost criteria."
                data={[
                  {
                    id: "1",
                    name: "Exactly this cost",
                    meta: IS,
                  },
                  {
                    id: "2",
                    name: "This cost or larger",
                    meta: LARGER_OR_EQUAL,
                  },
                  {
                    id: "3",
                    name: "This cost or smaller",
                    meta: SMALLER_OR_EQUAL,
                  },
                ]}
                onSelect={(entries) => {
                  setManaCondition(entries[0]?.meta ? entries[0].meta : IS);
                }}
                startValue={MANA_COST_START_VALUE}
              />
            </div>
          </div>
          <Seperator direction="ver" />

          {/* STATS */}
          <div className="search-field">
            <div className="label">
              <ImStatsBars2 className="icon" />
              {createText("Stats")}
            </div>

            <Dropdown
              placeholder="Choose a stat"
              data={[
                {
                  id: "1",
                  name: "Mana Value",
                  meta: "cmc",
                },
                {
                  id: "2",
                  name: "Power",
                  meta: "power",
                },
                {
                  id: "3",
                  name: "Toughness",
                  meta: "toughness",
                },
                {
                  id: "4",
                  name: "Loyalty",
                  meta: "loyalty",
                },
              ]}
              onSelect={(entries) => {
                setStatTarget(entries[0].meta ? entries[0].meta : "cmc");
              }}
              startValue={STATS_TARGET_START_VALUE}
            />
            <Dropdown
              placeholder="Choose condition"
              data={[
                {
                  id: "1",
                  name: "equal to",
                  meta: EQUAL,
                },
                {
                  id: "2",
                  name: "less than",
                  meta: SMALLER_THAN,
                },
                {
                  id: "3",
                  name: "greater than",
                  meta: LARGER_THAN,
                },
                {
                  id: "4",
                  name: "less than or equal",
                  meta: SMALLER_OR_EQUAL,
                },
                {
                  id: "5",
                  name: "greater than or equal",
                  meta: LARGER_OR_EQUAL,
                },
                {
                  id: "6",
                  name: "not equal to",
                  meta: NOT_EQUAL,
                },
              ]}
              onSelect={(entries) => {
                setStatCondition(entries[0].meta ? entries[0].meta : EQUAL);
              }}
            />
            <Input
              type="number"
              placeholder='Any value, e.g. "2"'
              value={statGoal}
              onChange={(e) => setStatGoal(e.target.value)}
            />
          </div>
          <Seperator direction="ver" />

          {/* FORMATS */}
          <div className="search-field">
            <div className="label">
              <FiLayers className="icon" />
              {createText("Format")}
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
          <Seperator direction="ver" />
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
          <Seperator direction="ver" />
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
