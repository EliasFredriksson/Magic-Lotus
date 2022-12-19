import "./card.scss";

type Props = {
  children?: React.ReactNode;
};

const Card = (props: Props) => {
  return <div className="card-component">{props.children}</div>;
};

export default Card;
