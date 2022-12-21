import "./card.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Card = (props: Props) => {
  return (
    <div
      {...props}
      className={`card-component ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
