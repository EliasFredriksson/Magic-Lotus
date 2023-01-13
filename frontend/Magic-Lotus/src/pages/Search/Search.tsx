import "./search.scss";
import { FormEvent, useCallback, useEffect, useState } from "react";
// COMPONENTS
import PageHeader from "../../components/PageHeader/PageHeader";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import Dropdown, { Data } from "../../components/Dropdown/Dropdown";
import Choice, { ChoiceData } from "../../components/Choice/Choice";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import useSearch from "../../hooks/useSearch/useSearch";
import useUtility from "../../hooks/useUtility/useUtility";
import useObjectState from "../../hooks/useObjectState/useObjectState";
// SERVICES
import { useFetchManaSymbols } from "../../services/backend/Symbol.service";
import { useFetchGetTypesCatalogs } from "../../services/backend/Catalog.service";
import { useFetchGetAllSets } from "../../services/backend/Sets.service";
import { storageGetItem, storageSetItem } from "../../services/Storage.service";
// REACT ICONS
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
import { FiLayers } from "react-icons/fi";
// CONSTANTS
import { CARD_TYPES, SUPER_TYPES } from "../../constants/CARD_TYPES";
import { IS } from "../../constants/FILTER_CONDITIONS";
import { Seperator } from "../../components/Seperator/Seperator";
import {
  ALLOW_PARTIAL_TYPES,
  COLORS,
  COLOR_CRITERIA,
  FORMAT_LEGALITIES,
  MANA_COST_CRITERIA,
  RARITIES,
  RARITY_CRITERIA,
  STATS,
  STATS_CONDITIONS,
} from "../../constants/FILTER_DATA";
import GAME_FORMATS from "../../constants/GAME_FORMATS";
// HELPERS
import { capitalizeWord, isEmpty } from "../../helpers/StringValidations";
import { IFullTextParams } from "../../helpers/fullTextConverter/FullTextConverter";

const COLOR_CONDITION_START_VALUE = [
  { id: "1", name: "Exactly these colors", meta: IS },
];
const MANA_CONDITION_START_VALUE = [
  { id: "1", name: "Exactly this cost", meta: IS },
];
const STATS_TARGET_START_VALUE = [{ id: "1", name: "Mana Value", meta: "cmc" }];
const RARITY_CRITERIA_START_VALUE = [
  { id: "1", name: "Is equal to", meta: IS },
];

function sortDataList(dataList: Data[]) {
  return dataList.sort((a, b) => {
    const textA = a.name ? a.name.toUpperCase() : "";
    const textB = b.name ? b.name.toUpperCase() : "";
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
}

interface IInputStates {
  cardName: string;
  cardText: string;
  cardTypes: Data[];
  allowPartial: ChoiceData[];
  cardColors: ChoiceData[];
  // COLORS
  colorCondition: Data[];
  // COMMANDER
  commanderColors: ChoiceData[];
  // MANA COST
  manaCost: string;
  manaCondition: Data[];
  // STATS
  statTarget: Data[];
  statCondition: Data[];
  statGoal: string;
  // FORMATS
  formatOneLegality: Data[];
  formatOneTargets: Data[];
  formatTwoLegality: Data[];
  formatTwoTargets: Data[];
  // SETS / BLOCKS
  cardSets: Data[];
  cardBlocks: Data[];
  // RARITY
  cardRarities: ChoiceData[];
  rarityCondition: Data[];
}
const BLANK_INPUT_STATES: IInputStates = {
  cardName: "",
  cardText: "",
  cardTypes: [],
  allowPartial: [],
  cardColors: [],
  colorCondition: COLOR_CONDITION_START_VALUE,
  commanderColors: [],
  manaCost: "",
  manaCondition: MANA_CONDITION_START_VALUE,
  statTarget: STATS_TARGET_START_VALUE,
  statCondition: [],
  statGoal: "",
  formatOneLegality: [],
  formatOneTargets: [],
  formatTwoLegality: [],
  formatTwoTargets: [],
  cardSets: [],
  cardBlocks: [],
  cardRarities: [],
  rarityCondition: RARITY_CRITERIA_START_VALUE,
};

const SESSION_STORAGE_KEY = "MagicLotusRecentFilter";

const Search = () => {
  const { openStatusModal } = useUtility();
  const { search, isLoading } = useSearch();

  // DATA
  const [catalogs, setCatalogs] = useState<Data[]>([]);
  const [manaSymbols, setManaSymbols] = useState<Data[]>([]);
  const [formats, setFormats] = useState<Data[]>([]);
  const [sets, setSets] = useState<Data[]>([]);
  const [blocks, setBlocks] = useState<Data[]>([]);

  // FETCH
  const getCatalogs = useFetchGetTypesCatalogs();
  const getManaSymbols = useFetchManaSymbols();
  const getSets = useFetchGetAllSets();

  // ################################### INPUT STATE ###################################
  const [inputs, setInputs] = useObjectState(BLANK_INPUT_STATES);

  // ON MOUNT FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchCatalogs = async () => {
      // ############################### CATALOGS ###############################
      const res = await getCatalogs.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        openStatusModal(res.error);
        return;
      }
      if (res.object === "network_error") {
        openStatusModal(res.error);
        return;
      }
      if (res.object === "unknown_error") {
        openStatusModal("Unknown error occured!");
        return;
      }
      let types: Data[] = [];
      res.data.map((cat, index) => {
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
      if (res.object === "network_error") {
        openStatusModal(
          res.error
            ? res.error
            : "Network error. You might be offline, check your internet status."
        );
        return;
      }
      if (res.object === "unknown_error") {
        openStatusModal("Unknown error occured!");
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
      // ############################### SETS / BLOCKS ###############################
      const res = await getSets.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        openStatusModal(res.error);
        return;
      }
      if (res.object === "network_error") {
        openStatusModal(
          res.error
            ? res.error
            : "Network error. You might be offline, check your internet status."
        );
        return;
      }
      if (res.object === "unknown_error") {
        openStatusModal("Unknown error occured!");
        return;
      }
      // CONVERT AND SORT SETS
      const convertedSets: Data[] = sortDataList(
        res.data.map((set) => {
          return {
            id: set.id,
            name: set.name,
            meta: set.code,
            svg: set.icon_svg_uri,
          };
        })
      );
      // CONVERT AND SORT BLOCKS
      const convertedBlocks: Data[] = res.data
        .filter((set) => set.block && set.block_code)
        .map((set, index) => {
          return {
            id: `${index}-${set.block}`,
            name: set.block ? set.block : "NO BLOCK FOUND",
            meta: set.block_code,
          };
        })
        .filter((set, index, list) => {
          return (
            index ===
            list.findIndex((entry) => {
              return set.meta === entry.meta;
            })
          );
        });

      setBlocks(convertedBlocks);
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
            meta: format,
          };
        }).sort()
      );
      // #######################################################################
    };

    fetchCatalogs();
    fetchSymbols();
    fetchSets();
    fetchFormats();

    const storedFilter = storageGetItem<IInputStates>(
      "SESSION",
      SESSION_STORAGE_KEY
    );
    if (storedFilter.success) setInputs(storedFilter.data);
  }, []);

  const createText = useCallback(
    (title: string) => <Text size="l">{title}</Text>,
    []
  );

  const triggerSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const query: IFullTextParams = {};

      console.log("SUBMITTED");
      storageSetItem("SESSION", SESSION_STORAGE_KEY, inputs);

      // CARD NAME
      if (!isEmpty(inputs.cardName)) query.q = `${encodeURI(inputs.cardName)}`;

      // ORACLE
      if (!isEmpty(inputs.cardText)) {
        const splitted = inputs.cardText.split(" ");
        query.oracle = splitted.map((word) => `oracle:${word}`).join(" ");
      }

      // CARD TYPES
      if (inputs.cardTypes.length > 0)
        query.type = inputs.cardTypes
          .map((type) =>
            encodeURI(type.name ? `type:${type.name.toLowerCase()}` : "")
          )
          .join(" ");

      // COLORS
      if (inputs.cardColors.length > 0 && inputs.colorCondition.length > 0)
        query.color = `c${inputs.colorCondition[0].meta}${inputs.cardColors
          .map((color) => color.meta)
          .join("")}`;

      // COMMANDER
      if (inputs.commanderColors.length > 0) {
        const formatted = inputs.commanderColors
          .map((choice) => choice.meta)
          .join("");
        query.color
          ? (query.color += ` c<=${formatted}`)
          : (query.color = `c<=${formatted}`);
      }

      // MANA COST
      if (!isEmpty(inputs.manaCost) && inputs.manaCondition.length > 0)
        query.mana = `mana${inputs.manaCondition[0].meta}${inputs.manaCost}`;

      // STATS
      if (
        inputs.statTarget.length > 0 &&
        inputs.statCondition.length > 0 &&
        !isEmpty(inputs.statGoal)
      ) {
        // CMC
        if (inputs.statTarget[0].meta === "cmc")
          query.cmc = `cmc${inputs.statCondition[0].meta}${inputs.statGoal}`;
        // POWER
        if (inputs.statTarget[0].meta === "power")
          query.power = `power${inputs.statCondition[0].meta}${inputs.statGoal}`;
        // TOUGHNESS
        if (inputs.statTarget[0].meta === "toughness")
          query.toughness = `toughness${inputs.statCondition[0].meta}${inputs.statGoal}`;
        // LOYALTY
        if (inputs.statTarget[0].meta === "loyalty")
          query.loyalty = `loyalty${inputs.statCondition[0].meta}${inputs.statGoal}`;
      }

      // FORMATS
      // row one
      if (
        inputs.formatOneLegality.length > 0 &&
        inputs.formatOneTargets.length > 0
      ) {
        if (inputs.formatOneLegality[0].meta === "legal") {
          query.format = inputs.formatOneTargets
            .map((format) => `format:${format.meta}`)
            .join(" ");
        }
        if (inputs.formatOneLegality[0].meta === "banned") {
          query.banned = inputs.formatOneTargets
            .map((format) => `banned:${format.meta}`)
            .join(" ");
        }
        if (inputs.formatOneLegality[0].meta === "restricted") {
          query.restricted = inputs.formatOneTargets
            .map((format) => `restricted:${format.meta}`)
            .join(" ");
        }
      }
      // row two
      if (
        inputs.formatTwoLegality.length > 0 &&
        inputs.formatTwoTargets.length > 0
      ) {
        const meta = inputs.formatTwoLegality[0].meta;
        if (meta === "legal") {
          const formatted = inputs.formatTwoTargets
            .map((format) => `format:${format.meta}`)
            .join(" ");
          query.format
            ? (query.format += ` ${formatted}`)
            : (query.format = formatted);
        }
        if (meta === "banned") {
          const formatted = inputs.formatTwoTargets
            .map((format) => `banned:${format.meta}`)
            .join(" ");
          query.banned
            ? (query.banned += ` ${formatted}`)
            : (query.banned = formatted);
        }
        if (meta === "restricted") {
          const formatted = inputs.formatTwoTargets
            .map((format) => `restricted:${format.meta}`)
            .join(" ");
          query.restricted
            ? (query.restricted += ` ${formatted}`)
            : (query.restricted = formatted);
        }
      }

      // SETS / BLOCKS
      if (inputs.cardSets.length > 0) {
        query.set = inputs.cardSets.map((set) => `set:${set.meta}`).join(" ");
      }
      if (inputs.cardBlocks.length > 0) {
        query.block = inputs.cardSets
          .map((set) => `block:${set.meta}`)
          .join(" ");
      }

      // RARITY
      if (inputs.cardRarities.length > 0) {
        query.rarity = inputs.cardRarities
          .map(
            (rarity) => `rarity${inputs.rarityCondition[0].meta}${rarity.meta}`
          )
          .join(" ");
      }

      // console.log("FINAL Q:\n\n", Object.values(query).join(" "));

      search({
        q: Object.values(query).join(" "),
      });
    },
    [inputs]
  );

  // useEffect(() => {
  //   console.clear();
  //   console.log("INPUTS: ", inputs);
  // }, [inputs]);

  return (
    <Main id="search-page">
      <form onSubmit={triggerSearch} className="middle">
        <PageHeader title="Advanced Search" />
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
              value={inputs.cardName}
              onChange={(e) => {
                setInputs({
                  cardName: e.target.value,
                });
              }}
            />
          </div>
          <Seperator direction="ver" />

          {/* TEXT */}
          <div className="search-field oracle">
            <div className="label">
              <TfiText className="icon" />
              {createText("Text")}
            </div>
            <Input
              placeholder={`Any text, e.g. "draw a card"`}
              type="text"
              value={inputs.cardText}
              onChange={(e) => {
                setInputs({
                  cardText: e.target.value,
                });
              }}
            />
            <div className="inner">
              <Dropdown
                picker
                stayOpenOnSelect={true}
                placeholder="Add symbol"
                data={manaSymbols}
                onSelect={(entries) => {
                  setInputs({
                    cardText: (inputs.cardText += entries[0].meta),
                  });
                }}
              />
            </div>
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
                setInputs({
                  cardTypes: active,
                });
              }}
              menuHeight="50rem"
              menuPosition="relative"
              startValue={inputs.cardTypes}
            />

            <div className="inner padded">
              <Choice
                variant="checkbox"
                data={ALLOW_PARTIAL_TYPES}
                onChange={(choices) => {
                  setInputs({
                    allowPartial: choices,
                  });
                }}
                startValue={inputs.allowPartial}
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
                setInputs({
                  cardColors: choices,
                });
              }}
              startValue={inputs.cardColors}
            />

            <div className="inner">
              <Dropdown
                placeholder="Choose a color criteria."
                data={COLOR_CRITERIA}
                onSelect={(entries) => {
                  setInputs({
                    colorCondition: entries,
                  });
                }}
                startValue={inputs.colorCondition}
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
                setInputs({
                  commanderColors: choices,
                });
              }}
              startValue={inputs.commanderColors}
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
                value={inputs.manaCost}
                type="text"
                placeholder='Any mana symbols, e.g. "{W}{W}"'
                onChange={(e) =>
                  setInputs({
                    manaCost: e.target.value,
                  })
                }
              />
              <Dropdown
                picker
                stayOpenOnSelect={true}
                placeholder="Add symbol"
                data={manaSymbols}
                onSelect={(entries) => {
                  setInputs({
                    manaCost: inputs.manaCost + entries[0].meta,
                  });
                }}
              />
              <Dropdown
                placeholder="Choose a mana cost criteria."
                data={MANA_COST_CRITERIA}
                onSelect={(entries) => {
                  setInputs({
                    manaCondition: entries,
                  });
                }}
                startValue={inputs.manaCondition}
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
              onSelect={(entries) =>
                setInputs({
                  statTarget: entries,
                })
              }
              startValue={inputs.statTarget}
            />
            <Dropdown
              placeholder="Choose condition"
              data={STATS_CONDITIONS}
              onSelect={(entries) =>
                setInputs({
                  statCondition: entries,
                })
              }
              startValue={inputs.statCondition}
            />
            <Input
              type="number"
              placeholder='Any value, e.g. "2"'
              value={inputs.statGoal}
              onChange={(e) =>
                setInputs({
                  statGoal: e.target.value,
                })
              }
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
                data={FORMAT_LEGALITIES}
                onSelect={(active) => {
                  setInputs({
                    formatOneLegality: active,
                  });
                }}
                startValue={inputs.formatOneLegality}
              />
              <Dropdown
                searchable
                multiChoice
                placeholder="Choose formats"
                menuPosition="relative"
                data={formats}
                onSelect={(active) => {
                  setInputs({
                    formatOneTargets: active,
                  });
                }}
                startValue={inputs.formatOneTargets}
              />
              {/* SECOND ROW */}
              <Dropdown
                searchable
                placeholder="Legality"
                menuPosition="relative"
                data={FORMAT_LEGALITIES}
                onSelect={(active) => {
                  setInputs({
                    formatTwoLegality: active,
                  });
                }}
                startValue={inputs.formatTwoLegality}
              />
              <Dropdown
                searchable
                multiChoice
                placeholder="Choose formats"
                menuPosition="relative"
                data={formats}
                onSelect={(active) => {
                  setInputs({
                    formatTwoTargets: active,
                  });
                }}
                startValue={inputs.formatTwoTargets}
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
                onSelect={(active) => {
                  setInputs({
                    cardSets: active,
                  });
                }}
                startValue={inputs.cardSets}
              />
              <Dropdown
                multiChoice
                searchable
                placeholder="Enter a block name or choose from the list"
                menuPosition="relative"
                data={blocks}
                onSelect={(active) => {
                  setInputs({
                    cardBlocks: active,
                  });
                }}
                startValue={inputs.cardBlocks}
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
              data={RARITIES}
              onChange={(choices) => {
                setInputs({
                  cardRarities: choices,
                });
              }}
              startValue={inputs.cardRarities}
            />
            <Dropdown
              placeholder="Rarity criteria"
              menuPosition="relative"
              data={RARITY_CRITERIA}
              onSelect={(entries) => {
                setInputs({
                  rarityCondition: entries,
                });
              }}
              startValue={inputs.rarityCondition}
            />
          </div>
          {/* <Seperator direction="ver" /> */}
          {/* CRITERIA */}
          {/* PRICES */}
          {/* ARTIST */}
          {/* FLAVOR TEXT */}
          {/* LORE FINDER */}
          {/* LANGUAGE */}
          {/* PREFERENCES */}

          {/* SUBMIT */}
        </Card>
        <Card className="submit-wrapper">
          <Button
            variant="secondary"
            className="reset-button"
            type="button"
            onClick={() => {
              storageSetItem(
                "SESSION",
                SESSION_STORAGE_KEY,
                BLANK_INPUT_STATES
              );
              setInputs(BLANK_INPUT_STATES);
            }}
          >
            Reset filter
          </Button>
          <Button
            fontSize="xxxl"
            variant="primary"
            onClick={triggerSearch}
            type="submit"
            className="search-button"
          >
            {isLoading ? <Spinner variant="pulse" size="medium" /> : "Search"}
          </Button>
        </Card>
      </form>
    </Main>
  );
};

export default Search;
