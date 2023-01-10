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
import GAME_FORMATS from "../../constants/GAME_FORMATS";
import { capitalizeWord } from "../../helpers/StringValidations";
import {
  ALLOW_PARTIAL_TYPES,
  COLORS,
  COLOR_CRITERIA,
  LEGALITIES,
  MANA_COST_CRITERIA,
  STATS,
} from "../../constants/FILTER_DATA";
import { useFetchGetAllSets } from "../../services/backend/Sets.service";

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
  const [formats, setFormats] = useState<Data[]>([]);
  const [sets, setSets] = useState<Data[]>([]);

  // FETCH
  const getCatalogs = useFetchGetTypesCatalogs();
  const getManaSymbols = useFetchManaSymbols();
  const getSets = useFetchGetAllSets();

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
  // row 1
  const [formatOneLegality, setFormatOneLegality] = useState("");
  const [formatOneTargets, setFormatOneTargets] = useState<string[]>([]);
  // row 2
  const [formatTwoLegality, setFormatTwoLegality] = useState("");
  const [formatTwoTargets, setFormatTwoTargets] = useState<string[]>([]);
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
    const fetchCatalogs = async () => {
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
        const title = words.map((word) => capitalizeWord(word)).join(" ");
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
    };
    const fetchSymbols = async () => {
      // ############################### MANA SYMBOLS ###############################
      const res = await getManaSymbols.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        openStatusModal(res.error);
        return;
      }
      // Convert recived mana to Data objects.
      const mana: Data[] = res.data.reverse().map((symbol, i) => {
        return {
          id: `${symbol.symbol}-${i}`,
          name: `${symbol.symbol}  ${symbol.english}`,
          meta: symbol.symbol,
        };
      });
      setManaSymbols(mana);
      // ###########################################################################
    };
    const fetchSets = async () => {
      // ############################### SETS ###############################
      const res = await getSets.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        openStatusModal(res.error);
        return;
      }
      const convertedSets: Data[] = res.data.map((set) => {
        return {
          id: set.id,
          name: set.name,
          svg: set.icon_svg_uri,
        };
      });
      setSets(convertedSets);
      // #####################################################################
    };
    const fetchFormats = () => {
      // ############################### FORMATS ###############################
      setFormats(
        GAME_FORMATS.map((format, index) => {
          return {
            id: `${index}-${format}`,
            name: capitalizeWord(format),
          };
        })
      );
      // #######################################################################
    };

    fetchCatalogs();
    fetchSymbols();
    fetchSets();
    fetchFormats();
  }, []);

  const createText = useCallback(
    (title: string) => <Text size="l">{title}</Text>,
    []
  );

  useEffect(() => {
    // console.clear();
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
    console.log("FORMATS (ONE):\t", formatOneLegality, formatOneTargets);
    console.log("FORMATS (TWO):\t", formatTwoLegality, formatTwoTargets);
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
    formatOneLegality,
    formatOneTargets,
    formatTwoLegality,
    formatTwoTargets,
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
                data={ALLOW_PARTIAL_TYPES}
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
              data={COLORS}
              onChange={(choices) => {
                setCardColors(
                  `${choices.map((choice) => `${choice.meta}`).join("")}`
                );
              }}
            />

            <div className="inner">
              <Dropdown
                placeholder="Choose a color criteria."
                data={COLOR_CRITERIA}
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
              data={COLORS}
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
                data={MANA_COST_CRITERIA}
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
              data={STATS}
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
          <div className="search-field formats">
            <div className="label">
              <FiLayers className="icon" />
              {createText("Format")}
            </div>

            <div className="wrapper">
              {/* FIRST ROW */}
              <Dropdown
                searchable
                placeholder="Legality"
                menuPosition="relative"
                data={LEGALITIES}
                onSelect={(active) => {
                  setFormatOneLegality(active[0].meta ? active[0].meta : "");
                }}
              />
              <Dropdown
                searchable
                multiChoice
                placeholder="Choose formats"
                menuPosition="relative"
                data={formats}
                onSelect={(active) => {}}
              />
              {/* SECOND ROW */}
              <Dropdown
                searchable
                placeholder="Legality"
                menuPosition="relative"
                data={LEGALITIES}
                onSelect={(active) => {
                  setFormatTwoLegality(active[0].meta ? active[0].meta : "");
                }}
              />
              <Dropdown
                searchable
                multiChoice
                placeholder="Choose formats"
                menuPosition="relative"
                data={formats}
                onSelect={(active) => {}}
              />
            </div>
          </div>
          <Seperator direction="ver" />

          {/* SETS / BLOCKS */}
          <div className="search-field sets">
            <div className="label">
              <TfiCrown className="icon" />
              {createText("Sets")}
            </div>

            <div className="wrapper">
              <Dropdown
                multiChoice
                searchable
                placeholder="Enter a set name or choose from the list"
                menuPosition="relative"
                data={sets}
                onSelect={(active) => {}}
              />
              <Dropdown
                multiChoice
                searchable
                placeholder="Enter a block name or choose from the list"
                menuPosition="relative"
                data={sets}
                onSelect={(active) => {}}
              />
            </div>
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
