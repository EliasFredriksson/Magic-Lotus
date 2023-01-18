import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Main from "../../components/Main/Main";
import Header from "../../components/Header/Header";
import Text from "../../components/Text/Text";
import useUtility from "../../hooks/useUtility/useUtility";
import ISet from "../../models/scryfall/interfaces/ISet";
import { useFetchGetSetByName } from "../../services/backend/Sets.service";
import "./set.scss";
import Button from "../../components/Button/Button";
import useSearch from "../../hooks/useSearch/useSearch";
import Image from "../../components/Image/Image";
import Flex from "../../components/Flex/Flex";
import { Seperator } from "../../components/Seperator/Seperator";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";

const Set = () => {
  const { name } = useParams();
  const { openStatusModal, updateTitle } = useUtility();
  const { search } = useSearch();
  const { breakpoints } = useScreenSize();

  const FetchSet = useFetchGetSetByName(name ? name : "");
  const [set, setSet] = useState<ISet | null>(null);

  useEffect(() => {
    updateTitle(name ? name : "Set");

    const fetchSet = async () => {
      const res = await FetchSet.triggerFetch();
      if (res.object === "aborted") return;
      if (
        res.object === "magic_lotus_error" ||
        res.object === "network_error" ||
        res.object === "unknown_error"
      ) {
        openStatusModal(res.error);
        return;
      }

      setSet(res.data);
    };

    fetchSet();
    return () => {
      FetchSet.abort();
    };
  }, []);

  useEffect(() => {
    if (set) console.table(set);
  }, [set]);

  return (
    <Main id="set-page">
      <Header title={name ? name : "Missing set name"} />
      {set ? (
        <Card>
          <Flex justify="space-between" align="center">
            <Text as="h6">Set symbol:</Text>
            <Image
              className="set-svg"
              imageUrl={set.icon_svg_uri}
              fallbackImageUrl=""
              imageSize={{ width: breakpoints.IS_MOBILE ? "8rem" : "12rem" }}
              spinnerSize="small"
            />
          </Flex>
          <Seperator direction="ver" />
          <Flex justify="space-between">
            <Text as="b">Card count:</Text>
            <Text as="i">{set.card_count} cards</Text>
          </Flex>
          <Seperator direction="ver" />
          {set.released_at && (
            <>
              <Flex justify="space-between">
                <Text as="b">Released: </Text>
                <Text as="i">{set.released_at}</Text>
              </Flex>
              <Seperator direction="ver" />
            </>
          )}
          <Button
            variant="link"
            onClick={() => {
              const query = set.search_uri.split("?")[1];
              search(`?${query}`);
            }}
          >
            View all cards from set
          </Button>
          <Seperator direction="ver" />
          <Button
            variant="link"
            onClick={() => {
              window.open(set.scryfall_uri, "_blank");
            }}
          >
            View set on{" "}
            <Text as="i" size="xl">
              Scryfall
            </Text>
          </Button>
        </Card>
      ) : (
        <Text>No set found...</Text>
      )}
    </Main>
  );
};

export default Set;
