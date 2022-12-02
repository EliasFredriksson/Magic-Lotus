import { useParams } from "react-router-dom";

type Props = {};

const Index = (props: Props) => {
  const params = useParams();

  return <div>Profile/{params["id"]}</div>;
};

export default Index;
