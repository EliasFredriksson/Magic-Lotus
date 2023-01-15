import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Main from "../../components/Main/Main";
import PageHeader from "../../components/Header/Header";
import Text from "../../components/Text/Text";
import useUtility from "../../hooks/useUtility/useUtility";
import ISet from "../../models/scryfall/interfaces/ISet";
import { useFetchGetSetByName } from "../../services/backend/Sets.service";
import "./set.scss";

const Set = () => {
  const { name } = useParams();
  const { openStatusModal, updateTitle } = useUtility();
  const FetchSet = useFetchGetSetByName(name ? name : "");
  const [set, setSet] = useState<ISet | null>(null);

  useEffect(() => {
    updateTitle(name ? name : "Set");

    const fetchSet = async () => {
      const res = await FetchSet.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
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

  return (
    <Main id="set-page">
      <div className="middle">
        <PageHeader title={name ? name : "Missing set name"} />
        {set ? (
          <Card>
            <Text>SET: {set.name}</Text>
          </Card>
        ) : (
          <Text>No set found...</Text>
        )}
      </div>
    </Main>
  );
};

export default Set;
