import FontSize from "../../models/frontend/types/FontSize";
import FontWeight from "../../models/frontend/types/FontWeight";
import "./text.scss";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
  family?: "main" | "heading";
  size?: FontSize;
  weight?: FontWeight;
}

const Text = (props: Props) => {
  return (
    <span
      {...props}
      className={`text-component${
        props.className ? ` ${props.className}` : ""
      }${props.family ? ` ${props.family}` : " main"}${
        props.size ? ` ${props.size}` : " m"
      }${props.weight ? ` ${props.weight}` : " medium"}${
        props.onClick ? " clickable" : ""
      }`}
    >
      {props.children}
    </span>
  );
};

export default Text;
