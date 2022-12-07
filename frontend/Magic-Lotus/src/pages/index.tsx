import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch/useFetch";
import { getCardsRandom } from "../services/Cards.service";

const LandingPage = () => {
  const { isLoading, error, success, data, triggerFetch, abort } =
    useFetch<string>({
      initValue: "",
      serviceFunction: getCardsRandom,
    });

  useEffect(() => {
    if (!isLoading) {
      console.log("DATA: ", data);
    }

    return () => {};
  }, [isLoading]);

  return (
    <Flex className="App" border="5px solid red">
      <Text>LANDING PAGE</Text>
      <Button
        onClick={() => {
          // triggerFetch();
        }}
      >
        FETCH
      </Button>
    </Flex>
  );
};

export default LandingPage;
