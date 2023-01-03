import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import useSearch from "../../hooks/useSearch/useSearch";
import ICatalog from "../../models/backend/interfaces/ICatalog";
import { useFetchGetCatalogs } from "../../services/backend/Catalog.service";
import { ICardSearchParams } from "../../services/scryfall/cards/Cards.search.service";
import { GoCreditCard } from "react-icons/go";
import { VscSymbolColor } from "react-icons/vsc";
import "./search.scss";
import { TfiText } from "react-icons/tfi";
import { IoFingerPrintOutline } from "react-icons/io5";
import { IFullTextParams } from "../../helpers/fullTextConverter/FullTextConverter";
import Dropdown from "../../components/Dropdown/Dropdown";
import Choice from "../../components/Choice/Choice";

type IInputState = {
  [Property in keyof Required<IFullTextParams>]: string;
};

const Search = () => {
  const { search } = useSearch();
  const getCatalogs = useFetchGetCatalogs();
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);

  const [inputStates, setInputStates] = useObjectState<IInputState>({
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

  useEffect(() => {
    const init = async () => {
      const catRes = await getCatalogs.triggerFetch();
      if (catRes.object === "aborted") return;
      if (catRes.object === "magic_lotus_error") {
        return;
      }
      setCatalogs(catRes.data);
      console.log("CATALOGS: ", catRes.data);
    };
    init();
  }, []);

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
              <Text size="xl">Card Name</Text>
            </div>
            <Input
              placeholder={`Any words in the name, e.g. "Fire"`}
              type="text"
              value={inputStates.q}
              onChange={(e) => {
                setInputStates({
                  q: e.target.value,
                });
              }}
            />
          </div>
          {/* TEXT */}
          <div className="search-field">
            <div className="label">
              <TfiText className="icon" />
              <Text size="xl">Text</Text>
            </div>
            <Input
              placeholder={`Any text, e.g. "draw a card"`}
              type="text"
              value={inputStates.oracle}
              onChange={(e) => {
                setInputStates({
                  oracle: e.target.value,
                });
              }}
            />
          </div>
          {/* TYPE LINE */}
          <div className="search-field">
            <div className="label">
              <IoFingerPrintOutline className="icon" />
              <Text size="xl">Type Line</Text>
            </div>

            <Dropdown
              multiChoice
              searchable
              menuPosition="relative"
              placeholder="Enter a type or choose from the list"
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

          <div className="search-field">
            <div className="label">
              <VscSymbolColor className="icon" />
              <Text size="xl">Colors</Text>
            </div>
            <Choice
              // multiChoice
              variant="checkbox"
              data={[
                {
                  id: "1",
                  name: "White",
                  img: "https://svgs.scryfall.io/card-symbols/BG.svg",
                },
                {
                  id: "2",
                  name: "Blue",
                },
                {
                  id: "3",
                  name: "Black",
                },
                {
                  id: "4",
                  name: "Red",
                },
                {
                  id: "5",
                  name: "Green",
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
        </Card>
      </div>
    </Main>
  );
};

export default Search;
