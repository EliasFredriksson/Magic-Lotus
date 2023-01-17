import FontAlign from "../../models/frontend/types/FontAlign";
import FontAs from "../../models/frontend/types/FontAs";
import FontSize from "../../models/frontend/types/FontSize";
import FontWeight from "../../models/frontend/types/FontWeight";
import "./text.scss";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
  family?: "main" | "heading";
  align?: FontAlign;
  size?: FontSize;
  weight?: FontWeight;
  as?: FontAs;
}

const Text = (props: Props) => {
  const Tag = props.as ? props.as : "span";
  return (
    <Tag
      {...props}
      className={`text-component${
        props.className ? ` ${props.className}` : ""
      }${props.family ? ` ${props.family}` : " main"}${
        props.size ? ` ${props.size}` : " m"
      }${props.weight ? ` ${props.weight}` : " medium"}${
        props.onClick ? " clickable" : ""
      }${props.align ? ` ${props.align}` : " start"}`}
    >
      {props.children}
    </Tag>
  );
};

export default Text;
