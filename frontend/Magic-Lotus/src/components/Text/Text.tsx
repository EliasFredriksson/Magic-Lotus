import FontAlign from "../../models/frontend/types/FontAlign";
import FontAs from "../../models/frontend/types/FontAs";
import FontFamily from "../../models/frontend/types/FontFamily";
import FontSize from "../../models/frontend/types/FontSize";
import FontWeight from "../../models/frontend/types/FontWeight";
import "./text.scss";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
  family?: FontFamily; // No default
  align?: FontAlign; // No default
  size?: FontSize; // No default
  weight?: FontWeight; // No default
  as?: FontAs; // Defaults to 'span'
}

const Text = (props: Props) => {
  const Tag = props.as ? props.as : "span";
  return (
    <Tag
      {...props}
      className={`text-component${
        props.className ? ` ${props.className}` : ""
      }${props.family ? ` ${props.family}` : ""}${
        props.size ? ` ${props.size}` : ""
      }${props.weight ? ` ${props.weight}` : ""}${
        props.onClick ? " clickable" : ""
      }${props.align ? ` ${props.align}` : ""}`}
    >
      {props.children}
    </Tag>
  );
};

export default Text;
